export default function CheckoutSideMobile({ subtotal, total, estimatedDay, estimatedMonth, items, isActive }) {

  const itemsMap = items.map((item) =>
    <div key={item.isbn} className="d-flex d-md-none align-items-center px-1 py-2">
      <div style={{ width: 100, height: 150 }}>
        <img className="w-100 h-100" src={item.image} alt='product'></img>
      </div>
      <div className="px-4">
        <h5>{item.title}</h5>
        <span>Qty: {item.quantity} @ ${item.price}</span>
        <p>Price: ${item.quantity * item.price}</p>
      </div>
    </div>
  )

  async function emptyCart() {
    try {
      const response = await fetch((`/api/cart`), { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`Response error: ${response.status}`)
      }
    }
    catch (error) {
      console.log(`There was a delete error: ${error.message}`)
    }
  }

  return (
      <section className="checkout-bag col-12 ">
        {isActive === 3 ?
        <>
          <div className="py-2 d-md-none">
            <h5>Arrives by {estimatedMonth} {estimatedDay}</h5>
          </div>
          {itemsMap}
          <div>
            <h5 className="m-0 py-2 px-5 text-center">By clicking the "Submit Order" button you confirm that you did not input any real information besides a email that will be used to send real confirmation.</h5>
          </div>
          <div className="text-center pb-2">
            <button type="submit" className='checkout-button dark-checkout-button px-5' onClick={() => emptyCart()}>Submit Order</button>
          </div>
        </>
        :
        <> </>
      }
      <hr></hr>
      </section>
  )
}
