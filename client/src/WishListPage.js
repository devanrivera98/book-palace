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
    <div className="container my-4 wishlist">
      <div className="row d-flex justify-content-center text-center">
       <h1>WISHLIST</h1>
      </div>
      <div>
        {view[0] === undefined ? <h3 className="text-center pt-3">There is nothing to display here.</h3> : <Wishlist books={view}/>}
      </div>
    </div>
  )

}
