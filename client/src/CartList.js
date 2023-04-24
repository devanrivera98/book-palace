
export default function CartList({books}) {

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

  return (
    <li key={bookId} id={bookId} className="my-3" style={{ backgroundColor: '#D9D9D9'}}>
      <div className="d-flex">
        <div className="p-3 col-md-3 col-sm-3">
          <img src={image} alt={title}/>
        </div>
        <div className="p-3 col-lg-8 col-md-9 col-7">
          <div className='col-12'>
            <h3 className="text-center">{title}</h3>
          </div>
          <h4 className="text-center">By {author}</h4>
          <h5 className="pb-1 price">Price: ${price}</h5>
          <h5 className='pb-1 quantity'>Qty: 1</h5>
        </div>
      </div>
    </li>
  )
}
