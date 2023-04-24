import { useState, useEffect } from "react";
import CartList from './CartList'

const url = (path) => `${path}`
//why can I not put my env REACT_APP^

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
        console.log('GET Success', jsonData)
      }
      catch (err) {
        console.log(err)
      }
    }
    getRequest();
  }, [])
console.log(cart)
  return (
      <CartList books={cart}/>
  )
}
