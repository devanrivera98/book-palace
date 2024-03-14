export default function CheckoutSideMobile({ subtotal, total, estimatedDay, estimatedMonth, items, isActive }) {

  const itemsMap = items.map((item) =>
    <div key={item.isbn} className="d-flex align-items-center px-1 py-2">
      <img className="w-25" src={item.image} alt={item.title} />
      <div className="px-4">
        <h5>{item.title}</h5>
        <span>Qty: {item.quantity} @ ${item.price}</span>
        <p>Price: ${item.quantity * item.price}</p>
      </div>
    </div>
  )

  return (
      <section className="checkout-bag d-md-none col-12 ">
        <hr></hr>
        {isActive === 3 ?
        <>
          <div className="py-2">
            <h5>Arrives by {estimatedMonth} {estimatedDay}</h5>
          </div>
          {itemsMap}
          <div>
            <h5 className="m-0 py-2 text-center">By clicking the "Submit Payment" button you confirm that you did not input any real information besides a email that will be used to send real confirmation</h5>
          </div>
          <div className="text-center pb-2">
            <button type="submit" className='checkout-button dark-checkout-button px-5' >Submit Order</button>
          </div>
        </>
        :
        <> </>
      }
      </section>
  )
}
