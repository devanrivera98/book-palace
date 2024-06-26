import { useState, useEffect } from "react"

export default function CheckoutDeliverInfo({isActive, onShow, updatePaymentForm, paymentInfo, updateDeliveryInfo, isDeliveryValid, continueToPayment}) {

  const {firstName, lastName, address, city, state, postalCode, email, phoneNumber } = paymentInfo
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isEmailMatch, setIsEmailMatch] = useState(false);

  useEffect(() => {

    updateDeliveryInfo()


  }, [firstName, lastName,address, city,state,postalCode,email, phoneNumber, updateDeliveryInfo])

  function handleEmailBlur(value) {
    const validEmailCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+/
    console.log(value)
    if (value.match(validEmailCheck)) {
      console.log('it matches')
      setIsEmailValid(true);
      setIsEmailMatch(true);
    } else {
      setIsEmailValid(false);
      setIsEmailMatch(false);
    }
  }

  // function handleEmailFocus() {
  //   setIsEmailValid(true)
  // }

  function handleEmailChange(e) {
    const validEmailCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+/
    updatePaymentForm({ email: e.target.value })
    console.log('true')
    if (e.target.value.match(validEmailCheck)) {
      console.log('valid')
      setIsEmailValid(true);
      setIsEmailMatch(true);
    } else {
      setIsEmailValid(false);
      setIsEmailMatch(false);
    }
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
            <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between">
              <div className="py-1 col-12 col-sm-6 pe-sm-1">
                <span>First Name<span className="required-asterick">*</span></span>
                <input type='text' name="firstName" placeholder="First Name" className="w-100 py-2 rounded" required value={firstName} onChange={(e) => updatePaymentForm({firstName: e.target.value})}/>
              </div>
            <div className="py-1 ps-sm-1 col-12 col-sm-6">
              <span>Last Name<span className="required-asterick">*</span></span>
                <input placeholder="Last Name" className="w-100 py-2 rounded" required value={lastName} onChange={(e) => updatePaymentForm({lastName: e.target.value})} />
              </div>
            </div>
            <div>
              <div className="w-100 py-1">
              <span>Address<span className="required-asterick">*</span></span>
                <input placeholder="Address" className="w-100 py-2 rounded" required value={address} onChange={(e) => updatePaymentForm({address: e.target.value})}/>
              </div>
            <div>
              <div className="d-flex flex-wrap flex-sm-nowrap">
                <div className="col-12 col-sm-4 pe-sm-1 py-1">
                  <span>City<span className="required-asterick">*</span></span>
                  <input placeholder="City" className="w-100 py-2 rounded" required value={city} onChange={(e) => updatePaymentForm({ city: e.target.value })} />
                </div>
                <div className="col-12 col-sm-4 px-sm-1 py-1">
                  <span>State<span className="required-asterick">*</span></span>
                  <input placeholder="State" className="w-100 py-2 rounded" required value={state} onChange={(e) => updatePaymentForm({ state: e.target.value })} />
                </div>
                <div className="col-12 col-sm-4 py-1 ps-sm-1">
                  <span>Postal Code<span className="required-asterick">*</span></span>
                  <input placeholder="Postal Code" className="w-100 py-2 rounded" required value={postalCode} onChange={(e) => updatePaymentForm({ postalCode: e.target.value })} />
                </div>
              </div>
              <div>
                <div className="w-100 py-1">
                  <span>Email Address<span className="required-asterick">*</span></span>
                  <input placeholder="Email" id="email" name="email" className="w-100 py-2 rounded" required value={email} onChange={(e) => handleEmailChange(e)} onBlur={(e) => handleEmailBlur(e.target.value)} />
                  {isEmailValid ? <></>
                  :
                  <span className="text-danger pt-1 d-flex">Enter a valid email: johndoe@yahoo.com</span>
                  }
                </div>
                <div className="w-100 pt-1">
                  <span>Phone Number<span className="required-asterick">*</span></span>
                  <input placeholder="Phone Number" className="w-100 py-2 rounded" required value={phoneNumber} onChange={(e) => updatePaymentForm({ phoneNumber: e.target.value })} />
                </div>
              </div>
            </div>
            </div>
            <div className="d-flex pt-4">
            {(isDeliveryValid && isEmailMatch) ? <button type="button"  className='mx-auto checkout-button dark-checkout-button' onClick={continueToPayment}>Continue to Add Payment</button>
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
