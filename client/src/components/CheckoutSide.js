export default function CheckoutSide({subtotal, total, estimatedDay, estimatedMonth, items}) {

  const bagMap = items.map((item) =>
    <div key={item.isbn} className="d-flex align-items-center px-1 py-2">
      <div style={{ width: '75px', height: '125px'}}>
        <img style={{objectFit: 'fill'}} className="w-100 h-100" src={item.image} alt='product'></img>
      </div>
      <div className="px-2">
        <span style={{ fontSize: '15px' }} className='d-block'>{item.title}</span>
        <span style={{ fontSize: '15px' }} className='d-block'>Qty: {item.quantity} @ ${item.price}</span>
        <span style={{ fontSize: '15px' }} className='d-block'>Price: ${item.quantity * item.price}</span>
      </div>
    </div>
  )

  return (
    <aside className="checkout-bag d-none col-md-12 d-md-block">
      <section>
        <h3>In your Bag</h3>
        <div className="px-1">
          <div className="d-flex justify-content-between">
            <div>
              <span>Subtotal</span>
            </div>
            <div>
              <span>${subtotal}</span>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <span>Delivery Fee</span>
            </div>
            <div>
              <span>$4.99</span>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <span><b>Total</b></span>
            </div>
            <div>
              <span>${total}</span>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="py-2">
          <h5>Arrives by {estimatedMonth} {estimatedDay}</h5>
        </div>
        {bagMap}
      </section>
    </aside>
  )
}
