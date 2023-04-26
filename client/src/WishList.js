import { RxCross1 } from "react-icons/rx";

export default function Wishlist({books, deleteBook, addBook}) {
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
  const {wishlistId, title, author, image, price, rating} = book;
  const bookId = `book-id-${wishlistId}`;

  return (
    <li key={bookId} id={wishlistId}>
      <div>
        <img alt={title} src={image}></img>
        <RxCross1 onClick={() => deleteBook(wishlistId)} />
        <h4>{author}</h4>
        <h4>{rating}</h4>
        <h4>{price}</h4>
        <button onClick={() => addBook(wishlistId)}></button>
      </div>
    </li>
  )
}
