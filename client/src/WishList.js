import { RxCross1 } from "react-icons/rx";
import {RiStarSFill} from 'react-icons/ri';
import { useNavigate } from "react-router-dom";

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

  async function addToCart(wishlist) {
    let moveBook = { title: 'Title Unknown', author: 'Author Unknown', isbn: 'Not Found', rating: 0, image: "https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif", price: 19.99, quantity: 1 }
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
      const response = await fetch((`/api/cart`), {method: 'POST', headers: {"Content-Type" : "application/json"}, body : JSON.stringify(moveBook)});
      if (!response.ok) {
        throw new Error(`Response error: ${response.status}`);
      }

      navigate('/checkout');
      const remove = await fetch((`/api/wishlist/${book.wishlistId}`), { method: 'DELETE' });
      if (!remove.ok) {
        throw new Error(`Reponse error: ${response.status}`)
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
          <div className="col-lg-2 col-md-3 col-3 d-flex">
             <img className="wishlist-image img-fluid" alt={title} src={image}/>
          </div>
        <div className="col-lg-10 col-md-9 col-9 pt-1 d-flex flex-column justify-content-between">
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
              <h4 className="wishlist-price">Price: ${price}</h4>
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
