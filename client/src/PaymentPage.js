import { useLocation } from "react-router-dom"
import { useState } from "react";
import CheckoutSide from "./components/CheckoutSide";
import CheckoutYourBag from "./components/CheckoutYourBag";
import CheckoutDeliverInfo from "./components/CheckoutDeliverInfo";
import CheckoutPaymentInfo from "./components/CheckoutPaymentInfo";

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

  const { firstName, lastName, address, city, state, postalCode, email, phoneNumber } = formData
  const deliveryProps = [firstName, lastName, address, city, state, postalCode, email, phoneNumber]
  const [isDeliveryValid, setIsDeliveryValid] = useState(false);

  const updateDeliveryInfo = () => {if (deliveryProps.every(prop => prop.length > 0)) {
    setIsDeliveryValid(true)
  } else {
    setIsDeliveryValid(false)
  }
  }
  console.log(isDeliveryValid)

  const updatePaymentInfo = (paymentInfo) => {
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
          <CheckoutDeliverInfo isActive={activeIndex} onShow={() => accordianSwitch(1)} paymentInfo={formData} updatePaymentInfo={updatePaymentInfo} updateDeliveryInfo={updateDeliveryInfo} isDeliveryValid={isDeliveryValid} />
          <CheckoutPaymentInfo isActive={activeIndex} onShow={() => accordianSwitch(2)} paymentInfo={formData} updatePaymentInfo={updatePaymentInfo} />
        </form>
        <CheckoutSide subtotal={subtotal} total={total} estimatedDay={estimatedDay} estimatedMonth={estimatedMonth} items={items} />
      </div>
    </div>
    </>
  )
}
