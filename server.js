const express=require('express');
const mailmeotp=require("./app");
const collection=require('./config');


const app= express();
const port = 1111;

app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/signup",(req,res)=>{
  res.render("signup");
});

app.post("/signup",async(req,res)=>{
  const userEmail=req.body.email;
  const existingUser= await collection.findOne({email : userEmail });
  if(existingUser){
    const newOTP=mailmeotp(userEmail);
    existingUser.otp=newOTP;
    existingUser.otpCreatedAt= new Date();
    await existingUser.save();
  }
  else{
    const newOTP=mailmeotp(userEmail);
    const data={
      email: userEmail,
      otp: newOTP,
      otpCreatedAt: new Date()
    }
    const newuser=new collection(data);
    await newuser.save();
  }
  
  res.render("verifyotp",{
    userEmail: userEmail
  });
  
})

app.get("/verifyotp",(req,res)=>{
  res.render("verifyotp");
})

app.post("/verifyotp",async(req,res)=>{
  const userEmail=req.body.userEmail;
  const userOTP=req.body.otp;
  const user= await collection.findOne({email : userEmail});
  if((user.otp==userOTP) && (new Date()-user.otpCreatedAt<= (300 * 1000))){
    res.send("Your email is succesfully verified");
  }
  else{
    res.send("You have entered Wrong or Expired OTP");
    
  }
  
})


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });