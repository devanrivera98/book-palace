export default function CheckoutSide({subtotal, total, estimatedDay, estimatedMonth, items}) {

  return (
    <aside className="checkout-bag d-none col-md-12 d-md-block">
      <section>
        <h3 className="py-2">In your Bag</h3>
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
        <div className="d-flex align-items-center px-1">
          <div style={{ width: 100, height: 150 }}>
            <img className="w-100 h-100" src={items[0].image}></img>
          </div>
          <div className="px-4">
            <h5>{items[0].title}</h5>
            <span>Qty: {items[0].quantity} @ ${items[0].price}</span>
            <p>Price: ${items[0].quantity * items[0].price}</p>
          </div>
        </div>
      </section>
    </aside>
  )
}
