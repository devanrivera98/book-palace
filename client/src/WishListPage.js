import { useState, useEffect } from "react";
import Wishlist from "./WishList";
import Footer from "./Footer";

export default function ViewWishlist() {
  const [view, setView] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function getData() {
      await requestWishlist()
      setIsLoading(false)
    }
    getData()
  }, [])

  async function requestWishlist() {
    try {
      const response = await fetch((`/api/wishlist`));
      if (!response.ok) {
        setIsLoading(false)
        throw new Error(`Response error: ${response.status}`);
      }
      const jsonData = await response.json();
      setView(jsonData);
    }
    catch (err) {
      setIsLoading(false);
      setError(err);
    }
  }
  if (isLoading) return (
    <div className="d-flex justify-content-center pt-3">
      <div className="lds-default" style={{ backgroundColor: '#FFFFFF' }}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )

  if (error) {
    return (
      <div className="d-flex justify-content-center pt-3" style={{fontSize: '20px'}}>
        <div>There was an error: {error.message} </div>
      </div>
    )
  }

  document.body.scrollTop = document.documentElement.scrollTop = 0;

  return (
    <>
    <div className="container my-4 content">
      <div className="row d-flex justify-content-center text-center">
       <h1>WISHLIST</h1>
      </div>
      <div>
        {view[0] === undefined ? <h3 className="text-center pt-3">There is nothing to display here.</h3> : <Wishlist books={view}/>}
      </div>
    </div>
    <Footer />
    </>
  )

}
