const mongose=require('mongoose');
const Schema=mongose.Schema;

const userSchema=new Schema({
    googleId:{
        type:String,
        unique:true
    },
    name:String,
    surname:String,
    profilePhotoUrl:String
});

module.exports=mongose.model('user',userSchema);