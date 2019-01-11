const mongose=require('mongoose');
const Schema=mongose.Schema;
const findOrCreate=require('mongoose-find-or-create');

const userSchema=new Schema({
    googleId:{
        type:String,
        unique:true
    },
    name:String,
    surname:String,
    profilePhotoUrl:String,
    email:String
});
userSchema.plugin(findOrCreate);
module.exports=mongose.model('user',userSchema);