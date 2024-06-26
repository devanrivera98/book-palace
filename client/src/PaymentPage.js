import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import CheckoutSide from "./components/CheckoutSide";
import CheckoutYourBag from "./components/CheckoutYourBag";
import CheckoutDeliverInfo from "./components/CheckoutDeliverInfo";
import CheckoutPaymentInfo from "./components/CheckoutPaymentInfo";
import CheckoutOrderReview from "./components/CheckoutOrderReview";
import { sendEmail } from "./functions/sendReceipt";
import CheckoutModal from "./components/CheckoutModal";

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const checkoutState = location.state;
  const {amountItems, items, subtotal, total} = checkoutState
  const currentDate = new Date();
  const daysToAdd = 7;
  let deliveryDate = new Date(currentDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000)
  let estimatedDay = deliveryDate.getDate();
  let estimatedMonth = deliveryDate.toLocaleString('default', {month: 'long'})
  const [activeIndex, setActiveIndex] = useState(1);
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

  const { firstName, lastName, address, city, state, postalCode, email, phoneNumber, cardNumber, expirationDate, cvv } = formData
  const deliveryProps = [firstName, lastName, address, city, state, postalCode, email, phoneNumber]
  const [isDeliveryValid, setIsDeliveryValid] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
      if (windowWidth > 768 && activeIndex === 0) {
        setActiveIndex(1);
      }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeIndex, windowWidth])

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, []);

  function handleResizeAccordian() {
    if (windowWidth > 768 && activeIndex === 0) {
      setActiveIndex(1)
    }
  }
  handleResizeAccordian()

  const updateDeliveryInfo = () => {
    if (deliveryProps.every(prop => prop.length > 0)) {
    setIsDeliveryValid(true)
    } else {
      setIsDeliveryValid(false)
    }
  }

  const [isPaymentValid, setIsPaymentValid] = useState(false);
  // const paymentProps = [cardNumber, expirationDate, cvv];

  const updatePaymentInfo = () => {
    const checkValidCardNumber = cardNumber.replace(/\s/g, '').match(/^\d{16}$/);
    const checkValidExpiryDate = expirationDate.match(/^(0[1-9]|1[0-2])[\/-]?([0-9]{2})$/);
    const checkValidCvv = cvv.match(/^\d{3,4}$/);

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
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    sendEmail(email, checkoutState, formData)
    navigate('/confirmation', {state: {formData, checkoutState, estimatedMonth, estimatedDay}})
  }

  return (
    <>
    <CheckoutModal/>
    <div className="content">
      <div className="d-flex justify-content-center align-items-center flex-column py-4">
        <h1 className="pb-1 m-0">Checkout</h1>
        <p className="d-md-none m-0">{amountItems} item: ${total}</p>
      </div>
      <div className="d-flex px-1">
        <div className="payment-accordian-container col-12 col-md-7 px-2">
          <form method="POST" onSubmit={handleSubmit} autoComplete='on'>
            {windowWidth > 768 ?
              <></>
              :
            <CheckoutYourBag isActive={activeIndex} items={items} estimatedMonth={estimatedMonth} estimatedDay={estimatedDay} subtotal={subtotal} total={total} onShow={() => accordianSwitch(0)} />
            }
            <CheckoutDeliverInfo isActive={activeIndex} onShow={() => accordianSwitch(1)} paymentInfo={formData} updatePaymentForm={updatePaymentForm} updateDeliveryInfo={updateDeliveryInfo} isDeliveryValid={isDeliveryValid} continueToPayment={() => accordianSwitch(2)} />
            <CheckoutPaymentInfo isActive={activeIndex} onShow={() => accordianSwitch(2)} paymentInfo={formData} updatePaymentForm={updatePaymentForm} isDeliveryValid={isDeliveryValid} updatePaymentInfo={updatePaymentInfo} isPaymentValid={isPaymentValid}  continueToOrderReview={() => accordianSwitch(3)}/>
            <CheckoutOrderReview onShow={() => accordianSwitch(3)} isActive={activeIndex} isDeliveryValid={isDeliveryValid} isPaymentValid={isPaymentValid} subtotal={subtotal} total={total} estimatedDay={estimatedDay} estimatedMonth={estimatedMonth} items={items} />
          </form>
        </div>
        <div className="d-none col-md-5 d-md-flex px-2">
          <CheckoutSide subtotal={subtotal} total={total} estimatedDay={estimatedDay} estimatedMonth={estimatedMonth} items={items} />
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}
