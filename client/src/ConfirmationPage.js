import { useLocation } from "react-router-dom"

export default function ConfirmationPage() {

  const location = useLocation();
  const itemsState = location.state

  console.log('form data confirmation', itemsState)

  return (
    <>
    <div className="mx-auto">
      <span style={{fontSize: '35px', fontWeight: '500'}} className='d-block text-center'>Thank you for testing out Book Palace!</span>
    </div>
    </>
  )
}
