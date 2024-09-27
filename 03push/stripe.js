document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('subscribe-button');
    button.addEventListener('click', () => {
        // Stripeの決済リンクにリダイレクト
        window.location.href = 'https://buy.stripe.com/4gwaFNfAh3Q9alO9AC';
    });
});
