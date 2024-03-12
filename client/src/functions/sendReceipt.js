
export const sendEmail = async (email) => {
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
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
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
