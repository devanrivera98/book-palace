export const sendEmail = async (email, orderDetails, formData) => {
  try {
    const response = await fetch('/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: email,
        subject: 'Your Book Palace Receipt',
        text: 'Your order is ready',
        html: receiptBody(orderDetails, formData),
      }),
    });
    if (response.ok) {
      console.log('Email sent successfully');
    } else {
      throw new Error('Error sending email');
    }
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
}

const receiptBody = (orderDetails, formData) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; display: flex; justify-content: center; align-items: center; margin: 0 auto;">
      <div style="text-align: center;">
        <h1>Thank you ${formData.firstName} for your order!</h1>
        <h3>Order Amount: ${orderDetails.amountItems}</h3>
        <h3>Date: ${new Date().toLocaleDateString()}</h3>
        <h5>Items:</h5>
        <ul style="list-style-type: none; padding: 0;">
          ${orderDetails.items.map((item) => `
            <li>
              <div style="display: flex; padding: 10px; border-bottom: 1px solid #ccc;">
                <div style="width: 100px; height: 150px;">
                  <img style="width: 100%; height: 100%;" src="${item.image}" />
                </div>
                <div style="padding-left: 20px; text-align: left;">
                  <h5>${item.title}</h5>
                  <p>Qty: ${item.quantity} @ $${item.price}</p>
                  <p>Price: $${item.quantity * item.price}</p>
                </div>
              </div>
            </li>
          `).join('')}
        </ul>
        <div style="padding-top: 10px;">
          <h3>Subtotal: $${orderDetails.subtotal}</h3>
          <h3>Tax: $4.99
          <hr></hr>
          <h3>Total: $${orderDetails.total}</h3>
          <h3>Thank you for testing out Book Palace!</h3>
        </div>
      </div>
    </div>
  `;
};
