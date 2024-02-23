export default function CheckoutYourBag({isActive, onShow, estimatedMonth, estimatedDay, items}) {


  return (
    <section>
      <hr></hr>
      <header className="d-flex justify-content-between">
        <h2>In your Bag</h2>
        <button onClick={onShow}>
          <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none" data-attr={isActive === 0 ? "caretDown" : "caretUp"}>
            {isActive === 0 ? <path stroke="currentColor" strokeWidth="1.5" d="M5.034 15.527L12 8.561l6.967 6.966"></path> : <path stroke="currentColor" strokeWidth="1.5" d="M18.966 8.476L12 15.443 5.033 8.476"></path>}
            </svg>
        </button>
      </header>
      <h4>Arrives by {estimatedMonth} {estimatedDay}</h4>
      <div className="d-flex">
        <div style={{width: 100}}>
          <img className="w-100" src={items[0].image} />
        </div>
        <div className="px-3">
          <h5>{items[0].title}</h5>
          <span>Qty: {items[0].quantity} @ ${items[0].price}</span>
          <p>Price: ${items[0].quantity * items[0].price}</p>
        </div>
      </div>
      <hr></hr>
    </section>
  )
}
