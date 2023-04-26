import { useState, useEffect } from "react";
import Wishlist from "./WishList";

export default function ViewWishlist() {
  const [view, setView] = useState([]);


  useEffect(() => {
    requestWishlist();
  }, [])

  async function requestWishlist() {
    try {
      const response = await fetch((`/api/wishlist`));
      if (!response.ok) {
        throw new Error(`Response error: ${response.status}`)
      }
      const jsonData = await response.json()
      setView(jsonData)
    }
    catch (error) {
      console.log(`There was a get error: ${error.message} `)
    }
  }

  return (
    <div className="container my-4">
      <div className="row d-flex justify-content-center text-center">
       <h1>WISHLIST</h1>
      </div>
      <div>
        <Wishlist books={view} />
      </div>
    </div>
  )



}
