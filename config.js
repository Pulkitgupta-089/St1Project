
const mongoose= require('mongoose');
const connect=mongoose.connect("mongodb://localhost:27017/otpverifyafs");
connect.then(()=>{
    console.log("Database Connected Succefully");
})
.catch(()=>{
    console.log("Database is unable to connect");
})

const newSchema= new mongoose.Schema({
    email: String,
    otp: String,
    otpCreatedAt:{type: Date,default: Date.now}
});

const collection= new mongoose.model("users",newSchema);

module.exports=collection;