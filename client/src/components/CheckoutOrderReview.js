import CheckoutSide from "./CheckoutSide"

export default function CheckoutOrderReview({isActive, onShow, isDeliveryValid, isPaymentValid, subtotal, total, estimatedDay, estimatedMonth, items}) {

  // const sendEmail = async (event) => {
  //   try {
  //     const response = await fetch('/send-email', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         to: event.target.elements.email.value,
  //         subject: 'Your Book Palace Receipt',
  //         text: 'and easy to do anywhere, even with Node.js',
  //         html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  //       }),
  //     });
  //     console.log(event.target.elements.email.value)
  //     if (response.ok) {
  //       console.log('Email sent successfully');
  //     } else {
  //       throw new Error('Error sending email');
  //     }
  //   } catch (error) {
  //     console.error('Error sending email:', error.message);
  //   }
  // }

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
      <CheckoutSide subtotal={subtotal} total={total} estimatedDay={estimatedDay} estimatedMonth={estimatedMonth} items={items} />
      <div>
        <h5 className="m-0 py-2 text-center">By clicking the "Submit Payment" button you confirm that you did not input any real information besides a email that will be used to send real confirmation</h5>
      </div>
      <div className="text-center pb-2">
        <button type="submit" className='checkout-button dark-checkout-button px-5' >Submit Order</button>
      </div>
    </div>
  )
}
