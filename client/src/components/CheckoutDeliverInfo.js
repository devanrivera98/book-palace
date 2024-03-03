export default function CheckoutDeliverInfo({isActive, onShow, updatePaymentInfo, paymentInfo}) {

  const {firstName, lastName, address, city, state, postalCode, email, phoneNumber } = paymentInfo

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2 className="m-0">Delivery Information</h2>
        <button onClick={onShow}>
          <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none" data-attr={isActive === 1 ? "caretDown" : "caretUp"}>
            {isActive === 1 ? <path stroke="currentColor" strokeWidth="1.5" d="M5.034 15.527L12 8.561l6.967 6.966"></path> : <path stroke="currentColor" strokeWidth="1.5" d="M18.966 8.476L12 15.443 5.033 8.476"></path>}
          </svg>
        </button>
      </div>
      {isActive === 1 ?
          <div className="py-3">
            <div className="d-flex flex-wrap">
              <div className="w-100 pb-3">
                <input type='text' name="firstName" placeholder="First Name" className="w-100 py-2 rounded" required />
              </div>
              <div className="w-100 py-3">
                <input placeholder="Last Name" className="w-100 py-2 rounded" required />
              </div>
            </div>
            <div>
              <div className="w-100 py-3">
                <input placeholder="Address" className="w-100 py-2 rounded" required />
              </div>
            <div>
              <div>
                <div className="w-100 py-3">
                  <input placeholder="City" className="w-100 py-2 rounded" required />
                </div>
                <div className="w-100 py-3">
                  <input placeholder="State" className="w-100 py-2 rounded" required />
                </div>
                <div className="w-100 py-3">
                  <input placeholder="Postal Code" className="w-100 py-2 rounded" required />
                </div>
              </div>
              <div>
                <div className="w-100 py-3">
                  <input placeholder="Email" className="w-100 py-2 rounded" required />
                </div>
                <div className="w-100 pt-3">
                  <input placeholder="Phone Number" className="w-100 py-2 rounded" required />
                </div>
              </div>
            </div>
            </div>
          </div>
        :
        <></>
      }
      <hr></hr>
    </div>
  )
}
