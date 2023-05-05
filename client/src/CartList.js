import { RxCross1 } from 'react-icons/rx';
export default function CartList({books, deleteBook}) {

  return (
    <ul className="list-group cart-ul">
      {
        books.map((book) =>
        <EachBook key={book.cartId} book={book} deleteBook={deleteBook} />
        )
      }
    </ul>
  )
}


function EachBook({ book, deleteBook}) {
  const { cartId, title, author, image, price } = book;
  const bookId = `book-id-${cartId}`;

  return (
    <li key={bookId} id={bookId} className="my-3" style={{ backgroundColor: '#F8F4EA' }}>
      <div className="d-flex">
        <div className="p-3 col-md-3 col-4 d-flex justify-content-center align-items-center">
          <img className='checkout-image' src={image} alt={title} />
        </div>
        <div className="p-2 col-md-9 col-8 d-flex flex-column justify-content-between">
          <div>
            <div className=' d-flex justify-content-end pb-1'>
              <RxCross1 className='hover-button' onClick={() => deleteBook(cartId)} style={{ fontSize: '20px' }} />
            </div>
            <div className='col-12'>
              <h5 className="text-center">{title}</h5>
            </div>
            <p className="text-center chart-author">By {author}</p>
          </div>
          <div className='row mt-auto'>
            <div className='col-7 d-flex justify-content-start'>
              <h5 className="pb-1">Price: ${price}</h5>
            </div>
            <div className='col-4 d-flex justify-content-end'>
              <h5 className='pb-1'>Qty: 1</h5>
            </div>
          </div>
        </div>
      </div>
    </li>

  )
}
