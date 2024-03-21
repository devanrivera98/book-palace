import { useLocation } from "react-router-dom"

export default function ConfirmationPage() {

  const location = useLocation();
  const { formData, checkoutState, estimatedMonth, estimatedDay } = location.state;

  const endingCardNumber = formData.cardNumber.slice(-4)
  console.log(endingCardNumber)

  console.log('form data confirmation', formData)

  return (
    <>
    <div className="pt-5">
      <span style={{fontSize: '36px', fontWeight: '450'}} className='d-block text-center mx-auto'>Thank you {formData.firstName} for your order!</span>
      <div>
        <span style={{ fontSize: '25px', fontWeight: '450' }} >Shipment</span>
        <hr></hr>
        <div className="d-flex flex-column">
          <span className="d-block">{formData.firstName} {formData.lastName}</span>
          <span className="d-block">{formData.address}</span>
          <span className="d-block">{formData.city}, {formData.state} {formData.postalCode}</span>
        </div>
      </div>
      <div>
        <span style={{ fontSize: '25px', fontWeight: '450' }}>Payment</span>
        <hr></hr>
        <span className="d-block">{formData.firstName} {formData.lastName}</span>
        <span className="d-block">{formData.address}</span>
        <span className="d-block">{formData.city}, {formData.state} {formData.postalCode}</span>
        <div>
          <span style={{ fontWeight: '700' }}>Billing Phone:</span>
          <span> {formData.phoneNumber}</span>
        </div>
        <div>
          <span style={{ fontWeight: '700' }}>Card Number:</span>
          <span> *****{endingCardNumber}</span>
        </div>
      </div>
      <div>
        <span style={{ fontSize: '25px', fontWeight: '450' }}>Estimated Arrival: {estimatedMonth} {estimatedDay}</span>
        <hr></hr>
      </div>
      <div>
        <span style={{ fontSize: '25px', fontWeight: '450' }}>Summary</span>
        <div>
          <div>
            <span>Subtotal</span>
          </div>
          <div>
            <span>Shipping</span>
          </div>
          <div>
            <span>Total</span>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
