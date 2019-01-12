const express = require('express');
const router = express.Router();

//lib messages redis getall
const Messages=require('../src/lib/Messages');


router.get('/list', function (req, res, next) {
 Messages.list('@Room:OR8fRlB9b',messages=>{
    res.json(messages);
})

});

module.exports = router;