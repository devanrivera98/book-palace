import { useLocation } from "react-router-dom"
import { useEffect } from "react";
import Footer from "./Footer";

export default function ConfirmationPage() {

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, []);

  const location = useLocation();
  const { formData, checkoutState, estimatedMonth, estimatedDay } = location.state;

  const endingCardNumber = formData.cardNumber.slice(-4)
  console.log(endingCardNumber)

  console.log('form data confirmation', checkoutState)

  const bagMap = checkoutState.items.map((item, index) =>
    <div className={index === checkoutState.items.length - 1 ? 'd-flex pt-2' : 'd-flex py-2'} key={item.isbn}>
      <div style={{ width: '75px', height: '125px' }}>
        <img className="w-100 h-100" src={item.image} alt='product' />
      </div>
      <div className="px-1">
        <span style={{ fontSize: '15px' }} className='d-block'>{item.title}</span>
        <span className='d-block'>Qty: {item.quantity} @ ${item.price}</span>
        <span className='d-block'>Price: ${item.quantity * item.price}</span>
      </div>
    </div>
  )

  return (
    <>
    <div className="pt-5 confirmation-container">
      <span style={{fontSize: '36px', fontWeight: '450'}} className='d-block text-center mx-auto'>Thank you {formData.firstName} for your order!</span>
      <div>
        <span style={{ fontSize: '25px', fontWeight: '450' }} >Shipment</span>
        <hr className="my-1"></hr>
        <div className="d-flex flex-column">
          <span className="d-block">{formData.firstName} {formData.lastName}</span>
          <span className="d-block">{formData.address}</span>
          <span className="d-block">{formData.city}, {formData.state} {formData.postalCode}</span>
        </div>
      </div>
      <div className="pt-1">
        <span style={{ fontSize: '25px', fontWeight: '450' }}>Payment</span>
        <hr className="my-1"></hr>
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
      <div className="pt-1">
        <span style={{ fontSize: '25px', fontWeight: '450' }}>Estimated Arrival: {estimatedMonth} {estimatedDay}</span>
        <hr className="my-1"></hr>
        {bagMap}
      </div>
      <div className="pt-1">
        <span style={{ fontSize: '25px', fontWeight: '450' }}>Summary</span>
        <hr className="my-1"></hr>
        <div className="col-md-3">
          <div className="d-flex justify-content-between">
            <span>Subtotal</span>
            <span>${checkoutState.subtotal}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Shipping</span>
            <span>$4.99</span>
          </div>
          <div className="d-flex justify-content-between">
            <span style={{ fontWeight: '700' }}>Total</span>
            <span style={{ fontWeight: '700' }}>${checkoutState.total}</span>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}
