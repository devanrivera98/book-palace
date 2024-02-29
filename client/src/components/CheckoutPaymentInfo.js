export default function CheckoutPaymentInfo({onShow, isActive }) {

 return (
  <div>
    <div className="d-flex justify-content-between">
      <h2 className="m-0">Payment</h2>
       <button onClick={onShow}>
         <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none" data-attr={isActive === 2 ? "caretDown" : "caretUp"}>
           {isActive === 2 ? <path stroke="currentColor" strokeWidth="1.5" d="M5.034 15.527L12 8.561l6.967 6.966"></path> : <path stroke="currentColor" strokeWidth="1.5" d="M18.966 8.476L12 15.443 5.033 8.476"></path>}
         </svg>
       </button>
    </div>
    { isActive === 2 ?
    <div>
      <div>
        <input placeholder="Card Number" />
      </div>
    </div>
    :
    <></>
    }
  </div>
 )
}
