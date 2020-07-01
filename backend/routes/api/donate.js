const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const stripeTestSecret = require('../../config/keys').stripeTestSecret;

router.get('/', (req, res) => {
    // res.json({msg:"works"});
    res.render("donate");
});

router.post('/', [
    check('email').isEmail().withMessage("Please enter a valid email address"),
    check('name').isAlpha().withMessage("Invalid Name"),
    check('amount').isInt({ min: 1 }).withMessage("Please enter a positive integer value for amount"),
], async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.render('donate', { title: 'Donate', errors: errors });
      }
    // TO ADD: data validation, storing errors in an `errors` variable!
    const name = req.body.name;
    const email = req.body.email;
    const amount = req.body.amount;
    try {
    // Create a PI:
    const stripe = require('stripe')(stripeTestSecret);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // In cents
        currency: 'usd',
        receipt_email: email,
    });
        //Add database entry here
    res.render('card', {name: name, amount: amount, intentSecret: paymentIntent.client_secret });
    } catch(err) {
    console.log('Error! ', err.message);
    }
  });

router.post('/thanks', (req, res) => {
    res.render('thanks', { title: 'Thanks!' });
});

module.exports = router;