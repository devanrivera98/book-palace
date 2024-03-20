export default function CheckoutModal() {
  return (
    <div className="checkout-modal">
      <div className="checkout-modal-content d-flex justify-content-between flex-column">
        <h2 className="text-center">Important Notice</h2>
        <p style={{ fontSize: '25px' }} className='text-center'>Thank you for trying out Book Palace. Please make sure to not include any personal information besides an email if you wish to receive an email confirmation of your mock order.</p>
        <div className="d-flex justify-content-center align-content-end">
          <button className='checkout-modal-button dark-checkout-button'>I understand</button>
        </div>
      </div>
    </div>
  )
}
