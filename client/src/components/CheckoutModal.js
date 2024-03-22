import { useState, useEffect } from "react"

export default function CheckoutModal() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {

    function showModal() {
      setIsModalOpen(true);
    }
    const timer = setTimeout(showModal, 2000)

    return () => {
      clearTimeout(timer);
    }
  }, [])

  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div className={`checkout-modal ${isModalOpen ? '' : 'd-none'}`}>
      <div className="checkout-modal-content d-flex justify-content-between flex-column">
        <h2 className="text-center m-0" style={{fontWeight: '700'}}>Important Notice</h2>
        <p style={{ fontSize: '25px' }} className='text-center'>Thank you for trying out Book Palace. Please make sure to not include any personal information besides an email if you wish to receive an email confirmation of your mock order.</p>
        <div className="d-flex justify-content-center align-content-end">
          <button className='checkout-modal-button dark-checkout-button' onClick={closeModal}>I understand</button>
        </div>
      </div>
    </div>
  )
}
