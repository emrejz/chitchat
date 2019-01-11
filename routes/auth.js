const express=require('express');
const router=express.Router();
const passportGoogle=require('../auth/google');

router.get('/google',passportGoogle.authenticate(
    'google',
    {
        scope:['profile','email']
    }
));
router.get('/google/callback',passportGoogle.authenticate(
    'google',
    {
        failureRedirect: '/'
    }),
    (req,res)=>{
        res.redirect('chat')
    }
    );

module.exports=router;