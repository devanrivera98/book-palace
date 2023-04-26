import { RxCross1 } from "react-icons/rx";
import {RiStarSFill} from 'react-icons/ri'
import { useNavigate } from "react-router-dom";

export default function Wishlist({books, deleteBook, addBook}) {
  console.log(books)
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

function WishlistBook({book, deleteBook, addBook }) {
  const {wishlistId, title, author, image, price, rating, isbn} = book;
  const bookId = `book-id-${wishlistId}`;
  const navigate = useNavigate();

  async function addToCart() {
    let moveBook = { title: 'Title Unknown', author: 'Author Unknown', isbn: 'Not Found', rating: 0, image: "https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif", price: 19.99, quantity: 1 }
    if (title) {
      moveBook.title = title;
    }
    if (author) {
      moveBook.author = author;
    }
    if (isbn) {
      moveBook.isbn = isbn
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
    console.log(moveBook)
    try {
      const response = await fetch((`/api/cart`), {method: 'POST', headers: {"Content-Type" : "application/json"}, body : JSON.stringify(moveBook)})
      if (!response.ok) {
        throw new Error(`Response error: ${response.status}`)
      }
      const jsonData = await response.json();
      console.log(jsonData);
      navigate('/checkout');
    }
    catch (error) {
      console.log(`There was an issue moving item from wishlist to cart: ${error.message}`)
    }
  }
  //for next feature
  // async function deleteItem(wishlistId) {
  //   try {

  //   }
  // }

  const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<RiStarSFill key={i} />)
    }
  return (
    <li key={bookId} id={wishlistId} className="py-2 my-3" style={{ backgroundColor: '#F8F4EA'}}>
      <div className="row px-2">
          <div className="col-lg-3 col-md-3 col-3 d-flex">
            <img className="checkoutImage img-fluid" alt={title} src={image}></img>
          </div>
          <div className="col-lg-9 col-md-9 col-9 pt-2">
            <div className="row">
            <div className="col-9">
                <h4>{title}</h4>
              </div>
              <div className="col-3 d-flex justify-content-center align-items-center">
                <RxCross1 />
              </div>
            </div>
            <div>
              <h6>By: {author}</h6>
              <ul className="stars">Rating: {stars}</ul>
              <div className="d-flex justify-content-end">
                <h4 className="wishlist-price"> Price: ${price}</h4>
              </div>
            </div>
          </div>
      </div>
      <div className="row mx-1 pt-2">
        <button type="button" className="btn btn-primary btn-lg btn-block" onClick={addToCart}>ADD TO CART</button>
      </div>

    </li>
  )
}
