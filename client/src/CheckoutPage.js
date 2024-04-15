import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartList from './CartList';
import Footer from "./Footer";

export default function CheckoutCart() {
  const [cart, setCart] = useState([]);
  const [amountItems, setAmountItems] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const navigate = useNavigate()

  useEffect(() => {
    getRequest();
  }, [])


  async function getRequest() {
    try {
      const response = await fetch((`/api/cart`));
      if (!response.ok) {
        setIsLoading(false);
        throw new Error(`Response error: ${response.status}`);
      }
      const jsonData = await response.json()

      jsonData.sort((a, b) => a.cartId - b.cartId);
      setCart(jsonData);
      let newTotal = 0;
      for (let i = 0; i < jsonData.length; i++) {
        for (let j = 0; j <  Number(jsonData[i].quantity); j++) {
          newTotal += Number(jsonData[i].price)
        }
      }
      let items = 0
      for (let i = 0; i < jsonData.length; i++) {
        items += Number(jsonData[i].quantity)
      }
      setAmountItems(items)
      setSubtotal(newTotal.toFixed(2));
      let grandTotal = 4.99 + newTotal;
      setTotal(grandTotal.toFixed(2));
      setIsLoading(false);
    }
    catch (error) {
      setIsLoading(false);
      setError(error);
    }
  }

  async function deleteBook(cartId) {
    try {
      const response = await fetch((`/api/cart/${cartId}`), { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`Response error: ${response.status}`);
      }
      await getRequest();
    }
    catch (error) {
      console.log(`There was a delete error: ${error.message}`);
    }
  }

  function viewPayment() {
    const paymentState = {
      items: cart,
      subtotal: subtotal,
      total: total,
      amountItems: amountItems
    }
    navigate('/payment', {state: paymentState})
  }

  if (isLoading) return (
    <div className="d-flex justify-content-center pt-3">
      <div className="lds-default" style={{ backgroundColor: '#FFFFFF' }}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )

  if (error) {
    return (
      <div className="d-flex justify-content-center pt-3" style={{ fontSize: '20px' }}>
        <div>There was an error: {error.message} </div>
      </div>
    )
  }

  document.body.scrollTop = document.documentElement.scrollTop = 0;

  return (
    <>
      <div className="container cart-container content">
        <div className="py-4 d-flex justify-content-center text-center">
          <h1>CART</h1>
        </div>
        <div className="cart-list col-lg-10">
          <h2>YOUR BAG</h2>
          <h3>Total Items: [{amountItems}]</h3>
        </div>
        <div className="pt-2 text-center">
          {cart.length === 0 ? <h4>Make sure to add to your cart if you are ready to checkout</h4> : <></>}
        </div>
        <div className="d-flex row justify-content-center cart-list col-lg-10">
          <CartList books={cart} deleteBook={deleteBook} />
        </div>
        {cart.length === 0 ? <></> :
        <div className="cart-list col-lg-10">
          <h3 className="pt-3 text-center">Order Summary</h3>
          <div className="py-2 d-flex justify-content-between">
            <h3>Subtotal</h3>
            <h4>${subtotal}</h4>
          </div>
          <div className="py-2 d-flex justify-content-between">
            <h3>Delivery</h3>
            <h4>$4.99</h4>
          </div>
          <hr/>
          <div className="py-2 d-flex justify-content-between">
            <h3>Total</h3>
            <h4>${total}</h4>
          </div>
        </div>
        }
      </div>
      {cart.length === 0 ? <></> :
        <div className="d-flex justify-content-center py-4 cart-list col-10">
          <button className="col-10 col-6 dark-purple-button py-1 btn-block rounded" onClick={viewPayment}>CHECKOUT</button>
        </div>
      }
      <Footer />
    </>
  )
}
