import { useLocation } from "react-router-dom"
import { useState } from "react";
import CheckoutSide from "./components/CheckoutSide";
import CheckoutYourBag from "./components/CheckoutYourBag";
import CheckoutDeliverInfo from "./components/CheckoutDeliverInfo";

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
  console.log(items)

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

  return (
    <>
    <div>
      <div className="d-flex justify-content-center align-items-center flex-column py-4">
        <h1 className="pb-1 m-0">Checkout</h1>
        <p className="d-lg-none m-0">{amountItems} item: ${total}</p>
      </div>
      <div className="payment-accordian-container">
        <CheckoutYourBag isActive={activeIndex} items={items} estimatedMonth={estimatedMonth} estimatedDay={estimatedDay} onShow={() => accordianSwitch(0)}/>
        <CheckoutDeliverInfo isActive={activeIndex} onShow={() => accordianSwitch(1)}/>
        {/* <section>
          <hr></hr>
          <header className="d-flex justify-content-between">
            <h2>In your Bag</h2>
            <button>
                <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none" data-attr="caretDown"><path stroke="currentColor" strokeWidth="1.5" d="M18.966 8.476L12 15.443 5.033 8.476"></path></svg>

            </button>
          </header>
          <h3>Arrives by {estimatedMonth} {estimatedDay}</h3>
          <hr></hr>
        </section> */}
        <CheckoutSide subtotal={subtotal} total={total} estimatedDay={estimatedDay} estimatedMonth={estimatedMonth} items={items} />
      </div>
    </div>
    </>
  )
}
