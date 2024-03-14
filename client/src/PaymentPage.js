import { useLocation } from "react-router-dom"
import { useState } from "react";
import CheckoutSide from "./components/CheckoutSide";
import CheckoutYourBag from "./components/CheckoutYourBag";
import CheckoutDeliverInfo from "./components/CheckoutDeliverInfo";
import CheckoutPaymentInfo from "./components/CheckoutPaymentInfo";
import CheckoutOrderReview from "./components/CheckoutOrderReview";
import { sendEmail } from "./functions/sendReceipt";

export default function PaymentPage() {
  const location = useLocation();
  const checkoutState = location.state;
  const {amountItems, items, subtotal, total} = checkoutState
  const currentDate = new Date();
  const daysToAdd = 7;
  let deliveryDate = new Date(currentDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000)
  let estimatedDay = deliveryDate.getDate();
  let estimatedMonth = deliveryDate.toLocaleString('default', {month: 'long'})


  const [activeIndex, setActiveIndex] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city:'',
    state: '',
    postalCode: '',
    email: '',
    phoneNumber: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  })
  console.log(formData)
  console.log(checkoutState)

  const { firstName, lastName, address, city, state, postalCode, email, phoneNumber, cardNumber, expirationDate, cvv } = formData
  const deliveryProps = [firstName, lastName, address, city, state, postalCode, email, phoneNumber]
  const [isDeliveryValid, setIsDeliveryValid] = useState(false);
  const [isValidCardNumber, setIsValidCardNumber] = useState(true)
  let isValidExpiryDate;
  let isValidCVV;

  const updateDeliveryInfo = () => {
    if (deliveryProps.every(prop => prop.length > 0)) {
      console.log('prop')
    setIsDeliveryValid(true)
    } else {
      setIsDeliveryValid(false)
    }
  }

  const [isPaymentValid, setIsPaymentValid] = useState(false);
  const paymentProps = [cardNumber, expirationDate, cvv];

  const updatePaymentInfo = () => {
    const checkValidCardNumber = cardNumber.replace(/\s/g, '').match(/^\d{16}$/);
    console.log(checkValidCardNumber)
    const checkValidExpiryDate = expirationDate.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/);
    const checkValidCvv = cvv.match(/^\d{3,4}$/);

    if(checkValidCardNumber) {
      setIsValidCardNumber(true)
    } else {
      setIsValidCardNumber(false)
    }
    // might be able to remove line 63 to 67

    if (checkValidCardNumber && checkValidExpiryDate && checkValidCvv) {
      setIsPaymentValid(true)
    } else {
      setIsPaymentValid(false)
    }
    return {
      checkValidCardNumber,
      checkValidExpiryDate,
      checkValidCvv
    };
  }

  const updatePaymentForm = (paymentInfo) => {
    setFormData((prevData) => ({
      ...prevData,
      ...paymentInfo
    }))
  }

  function accordianSwitch(num) {
    if (activeIndex === false) {
      setActiveIndex(num)
    } else if (activeIndex === num) {
      setActiveIndex(false)
    } else {
      setActiveIndex(num)
    }
    console.log(activeIndex)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    sendEmail(email, checkoutState, formData)
  }

  return (
    <>
    <div>
      <div className="d-flex justify-content-center align-items-center flex-column py-4">
        <h1 className="pb-1 m-0">Checkout</h1>
        <p className="d-lg-none m-0">{amountItems} item: ${total}</p>
      </div>
      <div className="payment-accordian-container">
        <form method="POST" onSubmit={handleSubmit} autoComplete='on'>
          <CheckoutYourBag isActive={activeIndex} items={items} estimatedMonth={estimatedMonth} estimatedDay={estimatedDay} onShow={() => accordianSwitch(0)} />
          <CheckoutDeliverInfo isActive={activeIndex} onShow={() => accordianSwitch(1)} paymentInfo={formData} updatePaymentForm={updatePaymentForm} updateDeliveryInfo={updateDeliveryInfo} isDeliveryValid={isDeliveryValid} continueToPayment={() => accordianSwitch(2)} />
          <CheckoutPaymentInfo isActive={activeIndex} onShow={() => accordianSwitch(2)} paymentInfo={formData} updatePaymentForm={updatePaymentForm} isDeliveryValid={isDeliveryValid} updatePaymentInfo={updatePaymentInfo} isPaymentValid={isPaymentValid}  continueToOrderReview={() => accordianSwitch(3)}/>
          <CheckoutOrderReview onShow={() => accordianSwitch(3)} isActive={activeIndex} isDeliveryValid={isDeliveryValid} isPaymentValid={isPaymentValid} subtotal={subtotal} total={total} estimatedDay={estimatedDay} estimatedMonth={estimatedMonth} items={items} />
        </form>
        {/* <CheckoutSide subtotal={subtotal} total={total} estimatedDay={estimatedDay} estimatedMonth={estimatedMonth} items={items} /> */}
      </div>
    </div>
    </>
  )
}
