import { RxCross1 } from "react-icons/rx";
import {RiStarSFill} from 'react-icons/ri';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import NavigateToBook from "./NavigateToBook";

export default function Wishlist({books}) {

  return (
    <ul className="list-group">
      {
        books.map((book) =>
        <WishlistBook key={book.wishlistId} book={book} />
        )
      }
    </ul>
  )
}

function WishlistBook({book}) {
  const {wishlistId, title, author, image, price, rating, isbn} = book;
  const bookId = `book-id-${wishlistId}`;
  const navigate = useNavigate();
  const [isTooMany, setIstooMany] = useState(null);
  const [jsonData, setJsonData] = useState([])

useEffect(() => {

  async function checkMyCart() {
    try {
      const response = await fetch('/api/cart');
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
        const response = await fetch((`/api/cart/${findBook.cartId}`), { method: 'PUT', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ quantity: increaseQuantity }) })

        if (!response.ok) {
          throw new Error(`Response error: ${response.status}`);
        }
      } else {
        const response = await fetch((`/api/cart`), { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(moveBook) });
        if (!response.ok) {
          throw new Error(`Response error: ${response.status}`);
        }
      }
      navigate('/checkout');
      const remove = await fetch((`/api/wishlist/${book.wishlistId}`), { method: 'DELETE' });
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
      const response = await fetch((`/api/wishlist/${book.wishlistId}`), {method: 'DELETE'})
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
    <li key={bookId} id={wishlistId} className="py-2 my-3" style={{ backgroundColor: '#F8F4EA'}}>
      <div className="row px-2">
        <div className="col-lg-3 col-md-3 col-3 d-flex justify-content-center" >
          <img className="wishlist-image img-fluid" alt={title} src={image} onClick={() => NavigateToBook(navigate, title, isbn)} style={{ maxHeight: '205px', minHeight: '137px' }} />
        </div>
        <div className="col-lg-9 col-md-9 col-9 pt-1 d-flex flex-column justify-content-between">
          <div>
            <div className="d-flex justify-content-end align-items-center">
              <RxCross1 className="hover-button" onClick={deleteItem} />
            </div>
            <div className="row">
              <div className="col-12">
                <h5>{title}</h5>
              </div>
            </div>
            <div>
              <h6>By: {author}</h6>
              <ul className="list-inline">Rating: {stars}</ul>
            </div>
          </div>
          <div className="d-flex justify-content-end align-items-end">
            <div>
              <h4>Price: ${price}</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="row mx-1 pt-2">
        {isTooMany === false && (
          <button type="button" className="dark-purple-button btn-lg btn-block rounded" onClick={addToCart}>ADD TO CART
          </button>
        )}
        {isTooMany === true && (
          <button type="button" className="dark-purple-button btn-lg btn-block rounded" onClick={viewCart}>VIEW CART
          </button>)}
      </div>

    </li>
  )
}
