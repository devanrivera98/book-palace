import { useState, useEffect } from "react";
import CartList from './CartList'


const url = (path) => `${path}`


export default function CheckoutCart() {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  useEffect(() => {
    getRequest();
  }, [])

  async function getRequest() {
    try {
      const response = await fetch(url(`/api/cart`))
      if (!response.ok) {
        throw new Error(`Response error: ${response.status}`)
      }
      const jsonData = await response.json()
      setCart(jsonData)
      let newTotal = 0
      for (let i = 0; i < jsonData.length; i++) {
        newTotal += Number(jsonData[i].price);
      }
      setSubtotal(newTotal.toFixed(2));
    }
    catch (error) {
      console.log(`There was a get error: ${error.message} `)
    }
  }

  function deleteBook(cartId) {
    async function removeRequest() {
      try {
        console.log(cartId)
        const response = await fetch(url(`/api/cart/${cartId}`), {method: 'DELETE'})
        if (!response.ok) {
          throw new Error(`Response error: ${response.status}`)
        }
        getRequest()
      }
      catch (error) {
        console.log(`There was a delete error: ${error.message}`)
      }
    }
    removeRequest()
  }

  return (
    <>
      <div className="container">
        <div className="py-4 d-flex justify-content-center text-center">
          <h1>CHECKOUT</h1>
        </div>
        <div className="cartList col-lg-10">
          <h2>YOUR BAG</h2>
          <h3>Total Items: [{cart.length}]</h3>
        </div>
        <div className="pt-2 text-center">
          <h4>Items in your bag are not reserved - check out now to make them yours</h4>
        </div>
        <div className="d-flex row justify-content-center cartList col-lg-10">
          <CartList books={cart} deleteBook={deleteBook} />
        </div>
        <div className="cartList col-lg-10">
          <h3 className="pt-3 text-center">Order Summary</h3>
          <div className="py-2 d-flex justify-content-between">
            <h3> Subtotal</h3>
            <h4>${subtotal}</h4>
          </div>
          <div className="py-2 d-flex justify-content-between">
            <h3>Delivery</h3>
            <h4>$4.99</h4>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center py-4 cartList col-lg-10">
        <button className='col-10 btn btn-block btn-primary'>CHECKOUT</button>
      </div>
    </>
  )
}
