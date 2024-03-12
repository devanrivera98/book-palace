import { useState, useEffect } from "react";

export default function CheckoutPaymentInfo({onShow, isActive, updatePaymentForm, updatePaymentInfo, paymentInfo, isDeliveryValid, isPaymentValid, continueToOrderReview }) {

  const {cardNumber, expirationDate, cvv} = paymentInfo
  const [isFormValid, setIsFormValid] = useState(false)
  console.log(expirationDate)

  useEffect(() => {

  updatePaymentInfo();

  }, [cardNumber, expirationDate, cvv]);

  function handleCreditCard(value) {
    const cleanedValue = value.replace(/\D/g, '');
    const formattedValue = cleanedValue.replace(/(.{4})/g, '$1 ').trim();
    updatePaymentForm({ cardNumber: formattedValue })
  }

  function handleNumbericInputs(e) {
    if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab" && e.key !== "ArrowLeft" && e.key !== "ArrowRight" && e.key !== "Delete" && e.key !== "Enter") {
      e.preventDefault();
    }
  }

 return (
  <div>
    <div className="d-flex justify-content-between">
      <h2 className={`m-0 ${isDeliveryValid ? '': 'grey-text'}`}>Add Payment</h2>
      {isDeliveryValid ?
         <button type="button" onClick={onShow}>
           <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none" data-attr={isActive === 2 ? "caretDown" : "caretUp"}>
             {isActive === 2 ? <path stroke="currentColor" strokeWidth="1.5" d="M5.034 15.527L12 8.561l6.967 6.966"></path> : <path stroke="currentColor" strokeWidth="1.5" d="M18.966 8.476L12 15.443 5.033 8.476"></path>}
           </svg>
         </button>
         :
         <></>
      }
    </div>
    { isActive === 2 ?
    <div>
      <div className="border d-flex flex-column my-4">
        <div className="payment-box-container d-flex flex-column align-items-center mx-auto">
          <div className="w-100 py-3">
            <input className="w-100 py-2" type="text" inputMode="numeric" maxLength={19} placeholder="Card Number" required  onChange={(e) => handleCreditCard(e.target.value)} value={cardNumber} onKeyDown={(e) => handleNumbericInputs(e)}
              />
          </div>
          <div className="w-100 py-3">
               <input className="w-100 py-2" placeholder="MM/YY" maxLength={5} required onChange={(e) => updatePaymentForm({ expirationDate: e.target.value })} value={expirationDate} />
          </div>
          <div className="w-100 py-3">
               <input className="w-100 py-2" placeholder="CVV" maxLength={4} required onChange={(e) => updatePaymentForm({ cvv: e.target.value })} value={cvv} />
          </div>
        </div>
      </div>
      <div className="d-flex">
        {isPaymentValid ?
        <button type="button" className='mx-auto checkout-button dark-checkout-button' onClick={continueToOrderReview}>Continue to Order Review</button>
        :
        <button type="button" className='mx-auto checkout-button light-checkout-button'>Continue to Order Review</button>
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
