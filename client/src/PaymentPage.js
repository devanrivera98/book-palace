import { useLocation } from "react-router-dom"

export default function PaymentPage() {
  const location = useLocation();
  const checkoutState = location;
  console.log(checkoutState)

  return (
    <>
    <div>
      <h1>Payment</h1>
    </div>
    </>
  )
}
