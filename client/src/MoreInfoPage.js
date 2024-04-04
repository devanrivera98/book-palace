import { BsFillHeartFill } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function  MoreInfoPage() {

  document.body.scrollTop = document.documentElement.scrollTop = 0;

  return (
    <MoreInfo/>
  )
}

function MoreInfo() {
  const location = useLocation();
  const navigate = useNavigate();
  const readBookObject = location.state;
  const [isInWishlist, setIsInWishlist] = useState(false);
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
        let titleToMatch;
        if (readBookObject.volumeInfo && readBookObject.volumeInfo.title) {
          titleToMatch = readBookObject.volumeInfo.title;
        } else {
          titleToMatch = readBookObject.title;
        }
        const booksinWishlist = jsonData.some((book) => book.title === titleToMatch);
        if (booksinWishlist) {
          setIsInWishlist(true)
        } else {
          setIsInWishlist(false)
        }
      }
      catch (error) {
        console.log(`There was an issue retrieving the wishlist items ${error.message}`)
      }
    }

    async function checkCartQuantity() {
      try {
        const response = await fetch('/api/cart');
        if (!response.ok) {
          throw new Error(`Response error: ${response.status}`);
        }
        const jsonData = await response.json();
        let titleToMatch;
        if (readBookObject.volumeInfo && readBookObject.volumeInfo.title) {
          titleToMatch = readBookObject.volumeInfo.title;
        } else {
          titleToMatch = readBookObject.title;
        }
        const booksinCart = jsonData.find((item) => item.title === titleToMatch);
        if (booksinCart) {
          if (booksinCart.quantity >= 9) {
            setIsTooMany(true)
          }
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

  function checkingConditions(book) {
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
      if (readBookObject.saleInfo.retailPrice) {
        book.price = readBookObject.saleInfo.retailPrice.amount.toFixed(2);
      }
    } else if (readBookObject) {
      const { title, author, isbn, rating, image, price } = readBookObject;
      if (title) {
        book.title = title;
      }
      if (author) {
        book.author = author;
      }
      if (isbn) {
        book.isbn = isbn;
      }
      if (rating) {
        book.rating = rating;
      }
      if (image) {
        book.image = image;
      }
      if (price) {
        book.price = price
      }
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
    const book = { title: 'Title Unknown', author: 'Author Unknown', isbn: 'Not Found', rating: 4, image: "https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif", price: 19.99, quantity: 1 }
    checkingConditions(book);
    try {
      let allBooks = await checkingCart()
      const foundBook = allBooks.find((item) => item.title === book.title);
      let booksinCart = false;

      if (foundBook) {
        booksinCart = true;
      }
      if (booksinCart) {
        let increaseQuantity = Number(foundBook.quantity) + 1
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
    let book = { title: 'Title Unknown', author: 'Author Unknown', isbn: 'Not Found', rating: 4, image: "https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif", price: 19.99, description: 'There was no description found for this book.'};
    checkingConditions(book);
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

  function viewWishlist() {
    navigate('/wishlist');
  }

  if (isLoading) return (
    <div className="d-flex justify-content-center pt-3">
      <div className="lds-default" style={{ backgroundColor: '#FFFFFF' }}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )

  if (readBookObject.volumeInfo) {
    return (
      <div className="container pt-4 text-center">
        <div>
          <h1>{readBookObject.volumeInfo.title ? readBookObject.volumeInfo.title : 'Title Unknown'}</h1>
          <h5>By {readBookObject.volumeInfo.authors ? readBookObject.volumeInfo.authors : 'Author Unknown'}</h5>
          <p>Average Review: {readBookObject.volumeInfo.averageRating ? readBookObject.volumeInfo.averageRating : 4}/5</p>
        </div>
        <img className="more-info-image" alt="book" src={readBookObject.volumeInfo.imageLinks ? readBookObject.volumeInfo.imageLinks.thumbnail : 'https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif'} />
        <div className='py-3'>
          <button onClick={isInWishlist ? viewWishlist : addToWishlist}><BsFillHeartFill />{isInWishlist ? 'View Wishlist' : 'Add to Wishlist'}</button>
        </div>
        <div className="row justify-content-center">
          <h4>Retail Price ${readBookObject.saleInfo.retailPrice ? readBookObject.saleInfo.retailPrice.amount.toFixed(2) : '19.99'}</h4>
          <button onClick={addBook} className={`${isTooMany ? 'hidden' : "col-6 dark-purple-button py-1 btn-block rounded"}`}>ADD TO CART</button>
          <button onClick={viewCart} className={`${isTooMany ? "col-6 dark-purple-button py-1 btn-block rounded" : 'hidden'}`}>View Cart</button>
        </div>
        <div className="pt-3 row justify-content-center">
          <h1>Overview</h1>
          <p className="col-10">{readBookObject.volumeInfo.description ? readBookObject.volumeInfo.description : 'Unfortunately, a book description was not found for this book.'}</p>
        </div>
      </div>
    )
  }

  if (readBookObject.title) {
    return (
      <div className="container pt-4 text-center">
        <div>
          <h1>{readBookObject.title ? readBookObject.title : 'Title Unknown'}</h1>
          <h5>By {readBookObject.author ? readBookObject.author : 'Author Unknown'}</h5>
          <p>Average Review: {readBookObject.rating ? readBookObject.rating : 4}/5</p>
        </div>
        <img className="more-info-image" alt="book" src={readBookObject.image ? readBookObject.image : 'https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif'} />
        <div className='py-3'>
          <button onClick={isInWishlist ? viewWishlist : addToWishlist}><BsFillHeartFill />{isInWishlist ? 'View Wishlist' : 'Add to Wishlist'}</button>
        </div>
        <div className="row justify-content-center">
          <h4>Retail Price ${readBookObject.price ? readBookObject.price : '19.99'}</h4>
          <button onClick={addBook} className={`${isTooMany ? 'hidden' : "col-6 dark-purple-button py-1 btn-block rounded"}`}>ADD TO CART</button>
          <button onClick={viewCart} className={`${isTooMany ? "col-6 dark-purple-button py-1 btn-block rounded" : 'hidden'}`}>View Cart</button>
        </div>
        <div className="pt-3 row justify-content-center">
          <h1>Overview</h1>
          <p className="col-10">{readBookObject.description ? readBookObject.description : 'Unfortunately, a book description was not found for this book.'}</p>
        </div>
      </div>
    )
  }

}
