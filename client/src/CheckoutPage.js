import { useState, useEffect } from "react";
import CartList from './CartList'

const url = (path) => `${path}`


export default function CheckoutCart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function getRequest() {
      try {
        const response = await fetch(url(`/api/cart`))
        if (!response.ok) {
          throw new Error(`Response error: ${response.status}`)
        }
        const jsonData = await response.json()
        setCart(jsonData)

      }
      catch (err) {
        console.log(err)
      }
    }
    getRequest();
  }, [])

console.log(cart)
  return (
    <>
      <div className="container">
        <div className="py-4 d-flex justify-content-center text-center">
          <h1>CHECKOUT</h1>
        </div>
        <div>
          <h2>YOUR BAG</h2>
        </div>
        <div className="pt-2 text-center">
          <h4>Items in your bag are not reserved - check out now to make them yours</h4>
        </div>
        <div className="d-flex row justify-content-center cartList">
          <CartList books={cart} />
        </div>
        <div>
          <h3 className="pt-3 text-center">Order Summary</h3>
          <div className="py-2 d-flex justify-content-between">
            <h3> Number of items: </h3>
            <h4>Price Holder</h4>
          </div>
          <div className="py-2 d-flex justify-content-between">
            <h3>Delivery</h3>
            <h4>$4.99</h4>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center py-4">
        <button className='col-10 btn btn-block btn-primary'>CHECKOUT</button>
      </div>
    </>
  )
}
