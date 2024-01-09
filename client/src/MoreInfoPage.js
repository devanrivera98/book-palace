import { BsFillHeartFill } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function  MoreInfoPage() {
  return (
    <MoreInfo/>
  )
}

function MoreInfo() {
  const location = useLocation();
  const navigate = useNavigate();
  const readBookObject = location.state;
  const [isInCart, setIsInCart] = useState(false);
  const [isTooMany, setIsTooMany] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let jsonData;
    async function checkWishlist() {
      try {
        const response = await fetch((`/api/wishlist`));
        if (!response.ok) {
          throw new Error(`Response error: ${response.status}`);
        }
        jsonData = await response.json();
        const booksinCart = jsonData.some((book) => book.title === readBookObject.volumeInfo.title);
        if (booksinCart) {
          setIsInCart(true)
          console.log('true')
        } else {
          setIsInCart(false)
          console.log('false')
        }
      }
      catch (error) {
        console.log(`There was an issue retrieving the cart items ${error.message}`)
      }
    }

    async function checkCartQuantity() {
      try {
        const response = await fetch('/api/cart');
        if (!response.ok) {
          throw new Error(`Response error: ${response.status}`);
        }
        const jsonData = await response.json();
        const booksinCart = jsonData.find((book) => book.title === readBookObject.volumeInfo.title);
        if (booksinCart.quantity >= 9) {
          setIsTooMany(true)
        }
      } catch (error) {
        console.log(`There was an issue checking the cart: ${error.message}`);
      }
    }
    
    async function fetchData() {
      await checkWishlist();
      await checkCartQuantity();
      setIsLoading(false);
    }
    fetchData()
  }, [readBookObject])

  function checkingCoditions(book) {
    const { volumeInfo } = readBookObject;
    if (volumeInfo) {
      const { title, authors, industryIdentifiers, averageRating, imageLinks } = volumeInfo;

      if (title) {
        book.title = title;
      }
      if (authors) {
        book.author = authors[0];
      }
      if (industryIdentifiers && industryIdentifiers[0]) {
        book.isbn = industryIdentifiers[0].identifier;
      }
      if (averageRating) {
        book.rating = averageRating;
      }
      if (imageLinks) {
        book.image = imageLinks.thumbnail;
      }
    }
    if (readBookObject.saleInfo.retailPrice) {
      book.price = readBookObject.saleInfo.retailPrice.amount.toFixed(2);
    }
  }

  async function checkingCart() {
    try {
      const response = await fetch(('/api/cart'))
      if (!response.ok) {
        throw new Error(`Response error: ${response.status}`);
      }
      let jsonData = await response.json();
      return jsonData
    }
    catch (error) {
      console.log(`There was an error checking cart: ${error.message} `);
    }
  }

    async function addBook() {
    const book = { title: 'Title Unknown', author: 'Author Unknown', isbn: 'Not Found', rating: 0, image: "https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif", price: 19.99, quantity: 1 }
    checkingCoditions(book);
    try {
      let allBooks = await checkingCart()
      const foundBook = allBooks.find((book) => book.title === readBookObject.volumeInfo.title);
      let cartId;
      let booksinCart = false;

      if (foundBook) {
        cartId = foundBook.cartId;
        console.log(cartId)
        booksinCart = true;
      }
      if (booksinCart) {
        let increaseQuantity = Number(foundBook.quantity) + 1
        console.log(increaseQuantity)
        const response = await fetch((`/api/cart/${foundBook.cartId}`), { method: 'PUT', headers: { "Content-Type": "application/json" }, body: JSON.stringify({quantity: increaseQuantity}) })
        if (!response.ok) {
          throw new Error(`Response error: ${response.status}`);
        }
      } else {
        const response = await fetch((`/api/cart`), { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(book) })
        if (!response.ok) {
          throw new Error(`Response error: ${response.status}`);
        }
      }
    navigate('/checkout');

    }
    catch (error) {
      console.log(`There was a post error: ${error.message} `);
    }
  }

  async function addToWishlist() {
    let book = { title: 'Title Unknown', author: 'Author Unknown', isbn: 'Not Found', rating: 0, image: "https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif", price: 19.99, description: 'There was no description found for this book.'};
    checkingCoditions(book);
    try {
      const response = await fetch((`/api/wishlist`), { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(book) });
      if (!response.ok) {
        throw new Error(`Response error: ${response.status}`);
      }
      navigate('/wishlist');

    }
    catch (error) {
      console.log(`There was a post error: ${error.message} `);
    }
  };

  function viewCart() {
    navigate('/checkout');
  }

  if (isLoading) return (
    <div className="d-flex justify-content-center pt-3">
      <div className="lds-default" style={{ backgroundColor: '#617143' }}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )

  return (
    <div className="container pt-4 text-center">
      <div>
        <h1>{readBookObject.volumeInfo.title ? readBookObject.volumeInfo.title : 'Title Unknown'}</h1>
        <h5>By {readBookObject.volumeInfo.authors ? readBookObject.volumeInfo.authors : 'Author Unknown'}</h5>
        <p>Average Review: {readBookObject.volumeInfo.averageRating ? readBookObject.volumeInfo.averageRating : 'No Rating'}/5</p>
      </div>
      <img className="more-info-image" alt="book" src={readBookObject.volumeInfo.imageLinks ? readBookObject.volumeInfo.imageLinks.thumbnail : 'https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif'} />
      <div className='py-3'>
        <button className={isInCart ? 'hidden' : ''} onClick={addToWishlist}><BsFillHeartFill/> Add to Wishlist</button>
      </div>
      <div className="row justify-content-center">
        <h4>Retail Price ${readBookObject.saleInfo.retailPrice ? readBookObject.saleInfo.retailPrice.amount.toFixed(2) :  '19.99'}</h4>
        <button onClick={addBook} className={`${isTooMany ? 'hidden' : "col-6 btn btn-block btn-primary"}`}>ADD TO CART</button>
        <button onClick={viewCart} className={`${isTooMany ? "col-6 btn btn-block btn-primary" : 'hidden'}`}>View Cart</button>
      </div>
      <div className="pt-3 row justify-content-center">
        <h1>Overview</h1>
        <p className="col-10">{readBookObject.volumeInfo.description ? readBookObject.volumeInfo.description : 'Unfortunately, a book description was not found for this book.'}</p>
      </div>
    </div>
  )
}
