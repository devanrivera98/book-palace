import { RxCross1 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import NavigateToBook from './NavigateToBook';
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
  const { cartId, title, author, image, price, isbn, quantity } = book;
  const bookId = `book-id-${cartId}`;
  const navigate = useNavigate();



  async function handleQuantityChange(event, book) {
    const newQuantity = event.target.value;
    console.log('this is new quantity', newQuantity);
    console.log('this is cartId',cartId)
    try {
      const response = await fetch((`/api/cart/${cartId}`), { method: 'PUT', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ quantity: newQuantity }) })
      if (!response.ok) {
        throw new Error(`Response error: ${response.status}`);
      }
   }
    catch (error) {
      console.log(`There was a put error: ${error.message} `);
    }
  }

  return (
    <li key={bookId} id={bookId} className="my-3" style={{ backgroundColor: '#F8F4EA' }}>
      <div className="d-flex">
        <div className="p-3 col-md-3 col-4 d-flex justify-content-center align-items-center">
          <img className="checkout-image" src={image} alt={title} onClick={() => NavigateToBook(navigate, title, isbn)} />
        </div>
        <div className="p-2 col-md-9 col-8 d-flex flex-column justify-content-between">
          <div>
            <div className="d-flex justify-content-end pb-1">
              <RxCross1 className="hover-button" onClick={() => deleteBook(cartId)} style={{ fontSize: '20px' }} />
            </div>
            <div className="d-flex">
              <h5 className="">{title}</h5>
            </div>
            <p className="chart-author">By {author}</p>
          </div>
          <div className="row mt-auto">
            <div className="col-7 d-flex justify-content-start">
              <h5 className="pb-1" style={{fontSize: '19px'}}>Price: ${price}</h5>
            </div>
            <div className="col-4 d-flex justify-content-end">
              <h5>Qty: &nbsp;</h5>
              <input className='pb-1' value={quantity} type='number' style={{ width: '40px', height: '30px' }} onChange={(event) => handleQuantityChange(event, book)}></input>
              {/* <h5 className="pb-1" style={{ fontSize: '19px' }}>{quantity}</h5> */}
            </div>
            {/* <div className='d-flex justify-content-end'>
              <div className='px-1'>Minus</div>
              <input value={quantity} type='number' style={{ width: '40px' }}></input>
              <div className='px-1'>Plus</div>
            </div> */}
          </div>
        </div>
      </div>
    </li>

  )
}
