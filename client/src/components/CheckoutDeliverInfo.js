import { useState, useEffect } from "react"

export default function CheckoutDeliverInfo({isActive, onShow, updatePaymentInfo, paymentInfo, updateDeliveryInfo, isDeliveryValid}) {

  const {firstName, lastName, address, city, state, postalCode, email, phoneNumber } = paymentInfo
  // const deliveryProps = [firstName, lastName, address, city, state, postalCode,email, phoneNumber]
  // const [isDeliveryValid, setIsDeliveryValid] = useState(false);

  useEffect(() => {

    updateDeliveryInfo()

    // if (deliveryProps.every(prop => prop.length > 0)) {
    //   setIsDeliveryValid(true)
    // } else {
    //   setIsDeliveryValid(false)
    // }


  }, [firstName, lastName,address, city,state,postalCode,email, phoneNumber])

  console.log(paymentInfo)

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
                <input type='text' name="firstName" placeholder="First Name" className="w-100 py-2 rounded" required value={firstName} onChange={(e) => updatePaymentInfo({firstName: e.target.value})}/>
              </div>
              <div className="w-100 py-3">
                <input placeholder="Last Name" className="w-100 py-2 rounded" required value={lastName} onChange={(e) => updatePaymentInfo({lastName: e.target.value})} />
              </div>
            </div>
            <div>
              <div className="w-100 py-3">
                <input placeholder="Address" className="w-100 py-2 rounded" required value={address} onChange={(e) => updatePaymentInfo({address: e.target.value})}/>
              </div>
            <div>
              <div>
                <div className="w-100 py-3">
                  <input placeholder="City" className="w-100 py-2 rounded" required value={city} onChange={(e) => updatePaymentInfo({ city: e.target.value })} />
                </div>
                <div className="w-100 py-3">
                  <input placeholder="State" className="w-100 py-2 rounded" required value={state} onChange={(e) => updatePaymentInfo({ state: e.target.value })} />
                </div>
                <div className="w-100 py-3">
                  <input placeholder="Postal Code" className="w-100 py-2 rounded" required value={postalCode} onChange={(e) => updatePaymentInfo({ postalCode: e.target.value })} />
                </div>
              </div>
              <div>
                <div className="w-100 py-3">
                  <input placeholder="Email" className="w-100 py-2 rounded" required value={email} onChange={(e) => updatePaymentInfo({ email: e.target.value })} />
                </div>
                <div className="w-100 pt-3">
                  <input placeholder="Phone Number" className="w-100 py-2 rounded" required value={phoneNumber} onChange={(e) => updatePaymentInfo({ phoneNumber: e.target.value })} />
                </div>
              </div>
            </div>
            </div>
            <div className="d-flex pt-4">
            {isDeliveryValid ? <button type="submit" className='mx-auto checkout-button dark-checkout-button'>Continue to Add Payment</button>
            :
            <button type="submit" className='mx-auto checkout-button light-checkout-button'>Continue to Add Payment</button>
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
