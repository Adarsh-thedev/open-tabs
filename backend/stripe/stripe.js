async function stripe(){
    try {
        const stripe = require('stripe')('sk_test_As8S4Qg46t3NtZAmvUlncBvm00hTEYlFMw');
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1477, // $14.77, an easily identifiable amount
            currency: 'usd',
        });
        console.log('Worked! ', paymentIntent.id);
    } catch (err) {
        console.log('Error! ', err.message);
    }
}

stripe();