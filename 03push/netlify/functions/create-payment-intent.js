const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price: 'price_1Hh1Y2IyNTgGDV2lK9g7eU5G', // ここに価格IDを設定
                quantity: 1,
            }],
            mode: 'subscription',
            success_url: `${process.env.URL}/success`,
            cancel_url: `${process.env.URL}/cancel`,
        });

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*', // CORS設定
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: session.url }),
        };
    } catch (error) {
        return {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': '*', // CORS設定
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ error: error.message }),
        };
    }
};
