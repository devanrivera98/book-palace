import { useState, useEffect } from "react"

export default function CheckoutDeliverInfo({isActive, onShow, updatePaymentForm, paymentInfo, updateDeliveryInfo, isDeliveryValid, continueToPayment}) {

  const {firstName, lastName, address, city, state, postalCode, email, phoneNumber } = paymentInfo
  const [isEmailValid, setIsEmailValid] = useState(true);

  useEffect(() => {

    updateDeliveryInfo()


  }, [firstName, lastName,address, city,state,postalCode,email, phoneNumber])

  console.log(paymentInfo)

  function handleEmailBlur(value) {
    var validEmailCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    console.log(value)
    if (value.match(validEmailCheck)) {
      setIsEmailValid(true)
    } else {
      setIsEmailValid(false)
    }
  }

  function handleEmailFocus() {
    setIsEmailValid(true)
  }

  function handleEmailChange(value) {
    
  }

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2 className="m-0">Delivery Information</h2>
        <button  type="button" onClick={onShow}>
          <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none" data-attr={isActive === 1 ? "caretDown" : "caretUp"}>
            {isActive === 1 ? <path stroke="currentColor" strokeWidth="1.5" d="M5.034 15.527L12 8.561l6.967 6.966"></path> : <path stroke="currentColor" strokeWidth="1.5" d="M18.966 8.476L12 15.443 5.033 8.476"></path>}
          </svg>
        </button>
      </div>
      {isActive === 1 ?
          <div className="py-3">
            <div className="d-flex flex-wrap">
              <div className="w-100 pb-3">
                <input type='text' name="firstName" placeholder="First Name" className="w-100 py-2 rounded" required value={firstName} onChange={(e) => updatePaymentForm({firstName: e.target.value})}/>
              </div>
              <div className="w-100 py-3">
                <input placeholder="Last Name" className="w-100 py-2 rounded" required value={lastName} onChange={(e) => updatePaymentForm({lastName: e.target.value})} />
              </div>
            </div>
            <div>
              <div className="w-100 py-3">
                <input placeholder="Address" className="w-100 py-2 rounded" required value={address} onChange={(e) => updatePaymentForm({address: e.target.value})}/>
              </div>
            <div>
              <div>
                <div className="w-100 py-3">
                  <input placeholder="City" className="w-100 py-2 rounded" required value={city} onChange={(e) => updatePaymentForm({ city: e.target.value })} />
                </div>
                <div className="w-100 py-3">
                  <input placeholder="State" className="w-100 py-2 rounded" required value={state} onChange={(e) => updatePaymentForm({ state: e.target.value })} />
                </div>
                <div className="w-100 py-3">
                  <input placeholder="Postal Code" className="w-100 py-2 rounded" required value={postalCode} onChange={(e) => updatePaymentForm({ postalCode: e.target.value })} />
                </div>
              </div>
              <div>
                <div className="w-100 py-3">
                  <input placeholder="Email" id="email" name="email" className="w-100 py-2 rounded" required value={email} onChange={(e) => updatePaymentForm({ email: e.target.value })} onBlur={(e) => handleEmailBlur(e.target.value)} onFocus={() => handleEmailFocus} />
                  {isEmailValid ? <></>
                  :
                  <span className="text-danger pt-1 d-flex">Enter a valid email: johndoe@yahoo.com</span>
                  }
                </div>
                <div className="w-100 pt-3">
                  <input placeholder="Phone Number" className="w-100 py-2 rounded" required value={phoneNumber} onChange={(e) => updatePaymentForm({ phoneNumber: e.target.value })} />
                </div>
              </div>
            </div>
            </div>
            <div className="d-flex pt-4">
            {(isDeliveryValid && isEmailValid) ? <button type="button"  className='mx-auto checkout-button dark-checkout-button' onClick={continueToPayment}>Continue to Add Payment</button>
            :
            <button type="button" className='mx-auto checkout-button light-checkout-button'>Continue to Add Payment</button>
            }
            </div>
          </div>
        :
        <></>
      }
      <hr></hr>
    </div>
  )
}
