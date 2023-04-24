export default function CartList({books}) {
  console.log(books)
  return (
    <ul className="list-group">
      {
        books.map((book) =>
        <EachBook key={book.cartId} book={book} />
        )
      }
    </ul>
  )
}


function EachBook({ book}) {
  const { cartId, title, author, image, price } = book;
  const bookId = `book-id-${cartId}`;
  console.log(bookId)
  return (
    <li key={bookId} id={bookId}>
      <div>
        <div>
          <img src={image} alt={title}/>
        </div>
        <div>
          <h3>{title}</h3>
          <h4>By {author}</h4>
          <h5>${price}</h5>
        </div>
      </div>
    </li>
  )
}
