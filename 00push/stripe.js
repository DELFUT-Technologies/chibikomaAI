document.addEventListener('DOMContentLoaded', () => {
    const stripe = Stripe('your-publishable-key-here'); // ここにStripeの公開可能なキーを設定
    const elements = stripe.elements();
    const cardElement = elements.create('card');
    cardElement.mount('#card-element');

    const form = document.getElementById('subscription-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                email: document.getElementById('email').value,
            },
        });

        if (error) {
            console.error(error);
        } else {
            fetch('/.netlify/functions/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ paymentMethodId: paymentMethod.id, customerEmail: document.getElementById('email').value })
            }).then(response => response.json())
              .then(data => {
                  if (data.error) {
                      console.error(data.error);
                  } else {
                      console.log('Subscription successful');
                      // Optionally, handle the client secret for further payment confirmation
                  }
              });
        }
    });
});
