import { useLocation } from "react-router-dom"
import Footer from "./Footer";

export default function ConfirmationPage() {

  const location = useLocation();
  const { formData, checkoutState, estimatedMonth, estimatedDay } = location.state;

  const endingCardNumber = formData.cardNumber.slice(-4)
  console.log(endingCardNumber)

  console.log('form data confirmation', checkoutState)

  const bagMap = checkoutState.items.map((item, index) =>
    <div className={index === checkoutState.items.length - 1 ? 'd-flex pt-2' : 'd-flex py-2'} key={item.isbn}>
      <div style={{ width: 100, height: 150 }}>
        <img className="w-100 h-100" src={item.image} />
      </div>
      <div className="px-3">
        <h5>{item.title}</h5>
        <span>Qty: {item.quantity} @ ${item.price}</span>
        <p>Price: ${item.quantity * item.price}</p>
      </div>
    </div>
  )

  return (
    <>
    <div className="pt-5 confirmation-container">
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
        {bagMap}
      </div>
      <div>
        <span style={{ fontSize: '25px', fontWeight: '450' }}>Summary</span>
        <div className="col-md-3">
          <div className="d-flex justify-content-between">
            <span>Subtotal</span>
            <span>{checkoutState.subtotal}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Shipping</span>
            <span>$4.99</span>
          </div>
          <div className="d-flex justify-content-between">
            <span style={{ fontWeight: '700' }}>Total</span>
            <span style={{ fontWeight: '700' }}>{checkoutState.total}</span>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}
