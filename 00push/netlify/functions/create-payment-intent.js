const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
    const { paymentMethodId, customerEmail } = JSON.parse(event.body);
    try {
        // Create a new customer
        const customer = await stripe.customers.create({
            payment_method: paymentMethodId,
          email: customerEmail,
            invoice_settings: {
                default_payment_method: paymentMethodId,
            },
        });

        // Create the subscription
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ price: 'prod_Qs4xixeNYevhcF' }], // Replace with your product ID
            expand: ['latest_invoice.payment_intent'],
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                subscriptionId: subscription.id,
                clientSecret: subscription.latest_invoice.payment_intent.client_secret,
            }),
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
