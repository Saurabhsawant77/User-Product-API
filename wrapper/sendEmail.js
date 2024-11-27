const nodemailer = require("nodemailer");
const logger = require("./logger");

const sendEmail = (user, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.FROM_EMAIL,
      pass: process.env.EMAIL_PASSKEY,
    },
  });

  //Define Email Options
  const url = `${process.env.FORGET_PASSWORD_URL}?token=${token}`;
  console.log(process.env.FROM_EMAIL);
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: `${user.email}`,
    subject: "Forgot Password",
    html: `Hello ${user.username}<a href="${url}"> <p> Click Here to Reset Pasword </p> </a>`,
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });


};

module.exports = sendEmail;
