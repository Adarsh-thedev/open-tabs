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
    check('email').isEmail().withMessage("Please enter a valid email address"),
    check('email').notEmpty().withMessage("Please enter an email address"),
    check('password').notEmpty().withMessage("Please enter a password"),
    check('password').isLength({min:5}).withMessage("Password Length Should be Minimum 5 characters"),
    check('method').notEmpty().withMessage("Method of login does not exist"),
    check('name').isAlpha().withMessage("Invalid name")
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
                            // if (!user.isVerified) return res.status(401).send({ type: 'not-verified', msg: 'Your account has not been verified.' });
                            // else{
                             return res.json({user:user, msg:'User authenticated'});
                            // }
                        }
                        else //if entered password is incorrect
                        {
                            return res.status(400).json({errors:{value:req.body.password,param:'password', msg:'Password for the given email incorrect'}});
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
                                // var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
                                // token.save((err)=>{
                                //     if(err)
                                //     {return res.status(500).send({error: err.message});}
                                // })
                                // var transporter = nodemailer.createTransport({ 
                                //     service: 'Sendgrid', 
                                //     auth: {
                                //          user: 'opentabs', 
                                //          pass: 'qwaszx12e' } 
                                //     // service: 'Gmail', 
                                //     // auth: {
                                //     //      user: 'no-reply@opentabs.org', 
                                //     //      pass: 'Qwaszx12e' }
                                // });
                                // var mailOptions = { 
                                //     from: 'no-reply@opentabs.org', 
                                //     to: user.local.email, 
                                //     subject: 'Account Verification Token', 
                                //     text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/api\/users\/confirmation\/' + token.token + '\n' };
                                // transporter.sendMail(mailOptions)
                                //     .catch(err=>console.log(err))
                                res.json({user:user,msg:'User created'});//,msg:"Now please verify your email ID by clicking on the link in the email sent to you"})

                            })
                            .catch(err=>console.log(err));
                    })
                })
                
            }
        })
    }
})

//POST '/api/users/update_tabs
//API to update tab counter 
router.post('/update_tabs',[
    check('email').isEmail(),
    check('email').notEmpty(),
    check('tabs_opened').notEmpty(),
    check('tabs_opened').isDecimal()
],(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors:errors.array()});
    }
    User.findOne({"local.email" : req.body.email})
        .then(user=>{
            if(user)
            {
                user.tabs_opened=req.body.tabs_opened;
                user.save();
                return res.json({msg:'Tabs updated'});
            }
            else
            {
                return res.json({errors:{user:'User with given email does not exist'}});
            }
        })
        .catch(err=>console.log(err));
}
   
)

router.post('/single_update_tabs',[
    check('email').isEmail(),
    check('email').notEmpty(),
],(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors:errors.array()});
    }
    User.findOne({"local.email" : req.body.email})
        .then(user=>{
            if(user)
            {
                user.tabs_opened= (user.tabs_opened + 1);
                user.save();
                return res.json({msg:'Tab updated', tabs_opened:user.tabs_opened});
            }
            else
            {
                return res.json({errors:{user:'User with given email does not exist'}});
            }
        })
        .catch(err=>console.log(err));
}
)

// router.post('/confirmation', userController.confirmationPost);
router.get('/confirmation/:token', [
    check('token').notEmpty(),
],(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors:errors.array()});
    }
    console.log(req.params.token);
    console.log(req.params.token);

    Token.findOne({ token: req.params.token }, function (err, token) {
        if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });

        // If we found a token, find a matching user
        User.findOne({ _id: token._userId, email: req.body.email }, function (err, user) {
            if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
            if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });

            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) { 
                    return res.status(500).send({ msg: err.message }); 
                }
                res.status(200).json({user:user, msg:"The account has been verified. Please log in."});
            });
        });
    });
})

module.exports = router;