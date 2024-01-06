import { RxCross1 } from 'react-icons/rx';
import { useState } from 'react';
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
  const [selectedQuantity, setSelectedQuantity] = useState(quantity || 1);
  const navigate = useNavigate();



  async function handleQuantityChange(event, book) {
    const newQuantity = event.target.value;
    setSelectedQuantity(newQuantity)
    try {
      const response = await fetch((`/api/cart/${cartId}`), { method: 'PUT', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ quantity: newQuantity }) })
      if (!response.ok) {
        throw new Error(`Response error: ${response.status}`);
      }
      book.quantity = newQuantity
      window.location.reload()
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
          <div className="row mt-auto align-items-center">
            <div className="col-7 d-flex justify-content-start align-items-center">
              <h5 style={{ fontSize: '16px', height: '24px', lineHeight: '35px' }}>Price: ${price}</h5>
            </div>
            <div className="col-4 d-flex justify-content-end align-items-center">
              <label htmlFor={`quantity${cartId}`} style={{ fontSize: '16px', height: '24px', }}>Qty: &nbsp;</label>
              <select id={`quantity${cartId}`} value={selectedQuantity} style={{ width: '50px', height: '30px', fontSize: '16px' }} onChange={(event) => handleQuantityChange(event, book)}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
              </select>
              {/* <h5>Qty: &nbsp;</h5>
              <input className='pb-1' value={quantity} type='number' style={{ width: '40px', height: '30px' }} onChange={(event) => handleQuantityChange(event, book)}></input> */}
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
