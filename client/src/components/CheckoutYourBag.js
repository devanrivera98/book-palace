export default function CheckoutYourBag({isActive, onShow, estimatedMonth, estimatedDay, items, subtotal, total}) {

  const bagMap = items.map((item, index) =>
    <div className={index === items.length - 1 ? 'd-flex pt-2' : 'd-flex py-2'} key={item.isbn}>
      <div style={{ width: 100, height: 150 }}>
        <img className="w-100 h-100" src={item.image} />
      </div>
      <div className="px-3">
        <h5>{item.title}</h5>
        <span>Qty: {item.quantity} @ ${item.price}</span>
        <p>Price: ${item.quantity * item.price}</p>
      </div>
    </div>
  )

  return (
    <section>
      <hr></hr>
      <header className="d-flex justify-content-between">
        <h2 className="m-0">In your Bag</h2>
        <button type="button" onClick={onShow}>
          <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none" data-attr={isActive === 0 ? "caretDown" : "caretUp"}>
            {isActive === 0 ? <path stroke="currentColor" strokeWidth="1.5" d="M5.034 15.527L12 8.561l6.967 6.966"></path> : <path stroke="currentColor" strokeWidth="1.5" d="M18.966 8.476L12 15.443 5.033 8.476"></path>}
            </svg>
        </button>
      </header>
      {isActive === 0 ?
      <>
        <div>
          <h4 className="m-0 py-1">Arrives by {estimatedMonth} {estimatedDay}</h4>
          {bagMap}
        </div>
        <div className="pt-3">
          <div className="d-flex justify-content-between">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Shipping</span>
            <span>$4.99</span>
          </div>
          <div className="d-flex justify-content-between">
            <span style={{ fontWeight: '700' }}>Total</span>
            <span style={{ fontWeight: '700' }}>${total}</span>
          </div>
        </div>
      </>
        :
        <></>
      }
      <hr></hr>
    </section>
  )
}
