
import CheckoutSideMobile from "./CheckoutSideMobile"

export default function CheckoutOrderReview({isActive, onShow, isDeliveryValid, isPaymentValid, subtotal, total, estimatedDay, estimatedMonth, items}) {


  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2 className={`m-0 ${isDeliveryValid && isPaymentValid ? '' : 'grey-text'}`}>Order Review</h2>
        {isDeliveryValid && isPaymentValid ?
          <button type="button" onClick={onShow}>
            <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none" data-attr={isActive === 3 ? "caretDown" : "caretUp"}>
              {isActive === 3 ? <path stroke="currentColor" strokeWidth="1.5" d="M5.034 15.527L12 8.561l6.967 6.966"></path> : <path stroke="currentColor" strokeWidth="1.5" d="M18.966 8.476L12 15.443 5.033 8.476"></path>}
            </svg>
          </button>
          :
          <></>
        }
      </div>
      <CheckoutSideMobile subtotal={subtotal} total={total} estimatedDay={estimatedDay} estimatedMonth={estimatedMonth} items={items} isActive={isActive} />
    </div>
  )
}
