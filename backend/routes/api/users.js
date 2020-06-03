const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Token = require('../../models/Token');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const sendgridAPIKey = require('../../config/keys').sendgridAPIKey;

router.get('/test',(req,res) =>res.json({msg:"works"}))


///ROUTE /api/users/register
router.post('/register', [
    check('email').isEmail(),
    check('email').notEmpty(),
    check('password').notEmpty(),
    check('password').isLength({min:5}),
    check('method').notEmpty(),
    check('name').isAlpha()
],(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors:errors.array()});
    }
    if(req.body.method == 'local') //for local login
    {
    

    User.findOne({"local.email" : req.body.email})
        .then(user => {
            if(user) //if user with given email exists  
            {
                
                bcrypt.compare(req.body.password, user.local.password)
                    .then(isMatch=>{
                        if(isMatch) //if password is correct
                        {
                            res.json({user:user, msg:'User authenticated'});
                        }
                        else //if entered password is incorrect
                        {
                            return res.status(400).json({errors:{password:'Password for the given email incorrect'}});
                        }
                    })
                    .catch(err=>{console.log(err)});
            }
            else //if user with given email does not exist
            {   
                var tabs = 0;
                if(req.body.tabs_opened) 
                {
                    tabs = req.body.tabs_opened;
                }
                
                const newUser = new User({
                    method:req.body.method,
                    local:{
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password
                    },
                    tabs_opened:tabs
                });
                bcrypt.genSalt(10, (err,salt)=>{
                    bcrypt.hash(newUser.local.password, salt, (err,hash)=>{
                        if(err) throw err;
                        newUser.local.password = hash;
                        newUser.save()
                            .then(user =>{
                                var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
                                var transporter = nodemailer.createTransport({ 
                                    service: 'Sendgrid', 
                                    auth: {
                                         user: 'scyther67', 
                                         pass: 'Ghana@111' } });
                                var mailOptions = { 
                                    from: 'jashjain@opentabs.org', 
                                    to: user.local.email, 
                                    subject: 'Account Verification Token', 
                                    text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + JSON.stringify(req.headers).host + '\/confirmation\/' + token.token + '.\n' };
                                transporter.sendMail(mailOptions)
                                    .catch(err=>console.log(err))
                                res.json(user)

                                // sgMail.setApiKey(sendgridAPIKey);
                                // const msg = {
                                // to: user.local.email,
                                // from: 'test@example.com',
                                // subject: 'Account Verification Token',
                                // text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n', 
                                // // text: 'hello',
                                // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
                                // };
                                // sgMail.send(msg)
                                //     .then(param =>{
                                //     console.log('Mail sent');
                                //     res.json(user)})})
                                //     .catch(err=>console.log(err))
                            })
                            .catch(err=>console.log(err));
                    })
                })
                
            }
        })
    }
})

// router.post('/confirmation', userController.confirmationPost);


module.exports = router;