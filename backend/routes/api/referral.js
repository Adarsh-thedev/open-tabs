const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

router.get('/referral_link', [
    // check('email').isEmail(),
    check('email').notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json({referralLink:"https:app.opentabs.org/referral/"});
    }
        User.findOne({ "local.email": req.body.email })
            .then(user => {
                if (user)
                {
                    res.json({referralLink:"https:app.opentabs.org/referral/"+user._id})
                }
                else
                {
                    return res.json({errors:{user:'User with given email does not exist'}});
                }
            })
})

// router.get('/referral_user', [
//     check("id").isLength({min:24,max:24}).withMessage("Incorrect id")
// ], (req, res) => {
//     const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(422).json({ errors: errors.array() });
//         }
//     User.findOne({ _id: req.body.id })
//         .then(user => {
//             if (user)
//             {
//                 res.json({ email: user.local.email });
//             }
//             else {
//                 res.json({ email: '' });
//             }
//         })
// })
router.post('/add_install_referral', [
    check("referred_by").isLength({min:24,max:24}).withMessage("Incorrect id")
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
        User.findOne({ "_id": req.body.referred_by })
            .then(user => {
                if (user) {
                    user.installReferrals = user.installReferrals + 1;
                    user.save();
                    return res.json({ msg: 'Referral complete' });
                }
                else{
                    return res.json({errors:{user:'User with given email does not exist'}})
                }
            })
}
)

router.post('/add_user_referral', [
    check("referred_by").isLength({min:24,max:24}).withMessage("Incorrect id")
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
        User.findOne({ "_id": req.body.referred_By })
            .then(user => {
                if (user) {
                    user.installReferrals = user.installReferrals + 1;
                    user.save();
                    return res.json({ msg: 'Referral complete' });
                }
                else{
                    return res.json({errors:{user:'User with given email does not exist'}})
                }
            })
}
)

module.exports = router;