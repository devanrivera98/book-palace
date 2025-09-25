import { RxCross1 } from "react-icons/rx";
import {RiStarSFill} from 'react-icons/ri';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { API_BASE_URL } from "./api-url";
import NavigateToBook from "./NavigateToBook";

export default function Wishlist({books}) {

  return (
    <ul className="list-group">
      {
        books.map((book, index) =>
        <WishlistBook key={index} index={index} book={book} />
        )
      }
    </ul>
  )
}

function WishlistBook({book, index}) {
  const {wishlistId, title, author, image, price, rating, isbn} = book;
  const bookId = `book-id-${wishlistId}`;
  const navigate = useNavigate();
  const [isTooMany, setIstooMany] = useState(null);
  const [jsonData, setJsonData] = useState([])

useEffect(() => {

  async function checkMyCart() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart`);
      if (!response.ok) {
        throw new Error(`Response error: ${response.status}`)
      }
      const jsonData = await response.json();
      setJsonData(jsonData)
      const findBook = jsonData.find((item) => item.title === title)
      if (findBook) {
        if (findBook.quantity >= 9) {
          setIstooMany(true)
        } else {
          setIstooMany(false)
        }
      } else {
        setIstooMany(false)
      }
    }
    catch (error) {
      console.log(`There was an issue checking the cart: ${error.message}`);
    }
  }
  async function getData() {
    await checkMyCart()
  }
  getData()
}, [title])



  async function addToCart(wishlist) {
    let moveBook = { title: 'Title Unknown', author: 'Author Unknown', isbn: 'Not Found', rating: 0, image: "https://islandpress.org/sites/default/files/default_book_cover_2015.jpg", price: 19.99, quantity: 1 }
    if (title) {
      moveBook.title = title;
    }
    if (author) {
      moveBook.author = author;
    }
    if (isbn) {
      moveBook.isbn = isbn;
    }
    if (rating) {
      moveBook.rating = rating;
    }
    if (image) {
      moveBook.image = image;
    }
    if (price) {
      moveBook.price = price;
    }

    try {
      const findBook = jsonData.find((item) => item.isbn === isbn)
      if (findBook) {
        let increaseQuantity = Number(findBook.quantity) + 1
        const response = await fetch((`${API_BASE_URL}/api/cart/${findBook.cartId}`), { method: 'PUT', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ quantity: increaseQuantity }) })

        if (!response.ok) {
          throw new Error(`Response error: ${response.status}`);
        }
      } else {
        const response = await fetch((`${API_BASE_URL}/api/cart`), { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(moveBook) });
        if (!response.ok) {
          throw new Error(`Response error: ${response.status}`);
        }
      }
      navigate('/checkout');
      const remove = await fetch((`${API_BASE_URL}/api/wishlist/${book.wishlistId}`), { method: 'DELETE' });
      if (!remove.ok) {
        throw new Error(`Reponse error: ${remove.status}`)
      }
    }
    catch (error) {
      console.log(`There was an issue moving item from wishlist to cart: ${error.message}`)
    }
  }

  async function deleteItem(wishlistId) {
    try {
      const response = await fetch((`${API_BASE_URL}/api/wishlist/${book.wishlistId}`), {method: 'DELETE'})
      if (!response.ok) {
        throw new Error(`Reponse error: ${response.status}`);
      }
      window.location.reload();
    }
    catch (error) {
      console.log(`There was a delete error: ${error.message} `);
    }
  }

  function viewCart() {
    navigate('/checkout')
  }

  const stars = [];
  if (0 === Number(rating)) {
    stars.push(<div className="list-inline-item" key="not found">Not Found</div>)
  } else {
    for (let i = 0; i < rating; i++) {
      stars.push(<RiStarSFill key={i} />)
    }
  }

  return (
    <li key={bookId} id={wishlistId}>
      {index === 0 ? <hr></hr> : <></>}
      <div className="d-flex">
        <div className='wishlist-image'>
          <img className="w-100 h-100" src={image} onClick={() => NavigateToBook(navigate, title, isbn)} />
        </div>
        <div className="px-3  sm:px-5 wishlist-description d-flex flex-column">
          <h3 className="pointer-finger underline" onClick={() => NavigateToBook(navigate, title, isbn)}>{title}</h3>
          <h6>By {author}</h6>
          <ul className="list-inline">Rating: {stars}</ul>
          <div className="pt-2"><b>${price}</b></div>
            <button type="button" className="dark-purple-button rounded mt-auto wishlist-button" onClick={isTooMany ? viewCart: addToCart}>{isTooMany ? 'View Cart' : 'Add to Cart'}
            </button>
           {/*Remember to change the width on mobile view and to also make it so that the button appears underneath for mobile screens */}
        </div>
        <div>
          <RxCross1 className="my-auto hover-button" style={{ fontSize: '20px' }} onClick={deleteItem} />
        </div>
      </div>
      <hr></hr>
    </li>
  )
}
