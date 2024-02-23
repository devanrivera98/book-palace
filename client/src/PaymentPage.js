import { useLocation } from "react-router-dom"

export default function PaymentPage() {
  const location = useLocation();
  const checkoutState = location.state;
  const {amountItems, items, subtotal, total} = checkoutState
  const currentDate = new Date();
  const daysToAdd = 7;
  let deliveryDate = new Date(currentDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000)
  let estimatedDay = deliveryDate.getDate();
  let estimatedMonth = deliveryDate.toLocaleString('default', {month: 'long'})
  console.log(items)

  return (
    <>
    <div>
      <div className="d-flex justify-content-center align-items-center flex-column py-4">
        <h1 className="pb-1">Checkout</h1>
        <p className="d-lg-none">{amountItems} item: ${total}</p>
      </div>
      <aside className="checkout-bag">
        <section>
          <h3>In your Bag</h3>
          <div>
              <div className="d-flex justify-content-between">
                <div>
                  <p>Subtotal</p>
                </div>
                <div>
                  <p>${subtotal}</p>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <p>Delivery Fee</p>
                </div>
                <div>
                  <p>$4.99</p>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <p><b>Total</b></p>
                </div>
                <div>
                  <p>${total}</p>
                </div>
              </div>
          </div>
          <div>
            <h5>Arrives by {estimatedMonth} {estimatedDay}</h5>
          </div>
          <div className="d-flex align-items-center">
            <img className="w-25" src={items[0].image}></img>
            <div className="px-4">
              <h5>{items[0].title}</h5>
              <p>Qty: {items[0].quantity} @ ${items[0].price}</p>
              <p>Price: ${items[0].quantity * items[0].price}</p>
            </div>
          </div>
        </section>
      </aside>
    </div>
    </>
  )
}
