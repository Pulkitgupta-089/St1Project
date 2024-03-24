const nodemailer = require("nodemailer");
require("dotenv").config();
function mailmeotp(userEmail) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: "guptapulkitgupta003@gmail.com",
      pass: process.env.PASS,
    },
  });

  function makeMyOTP() {
    let otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
  }
  const newOTP = makeMyOTP();
  const mail = {
    from: "guptapulkitgupta003@gmail.com",
    to: userEmail,
    subject: "Verify Your Account",
    text: "here is your otp to verify your sign in on myApp: " + newOTP,
  };

  transporter.sendMail(mail, (error, info) => {
    if (error) {
      console.log("Error");
    } else {
      console.log("email sent: " + info.response);
    }
  });
  return newOTP;
}

module.exports = mailmeotp;
