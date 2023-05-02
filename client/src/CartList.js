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
    <li key={bookId} id={bookId} className="my-3" style={{ backgroundColor: '#F8F4EA'}}>
      <div className="d-flex">
        <div className="p-3 col-md-3 col-5">
          <img className='checkoutImage' src={image} alt={title}/>
        </div>
        <div className="p-2 col-lg-9 col-md-9 col-7">
          <div className=' d-flex justify-content-end'>
            <RxCross1 className='hover-button' onClick={() => deleteBook(cartId)} style={{fontSize: '20px'}}/>
          </div>
          <div className='col-12'>
            <h5 className="text-center">{title}</h5>
          </div>
          <p className="text-center chart-author">By {author}</p>
          <h5 className="pb-1 price">Price: ${price}</h5>
          <h5 className='pb-1 quantity'>Qty: 1</h5>
        </div>
      </div>
    </li>
  )
}
