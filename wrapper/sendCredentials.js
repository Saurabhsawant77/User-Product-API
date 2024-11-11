const nodemailer = require("nodemailer");
const logger = require("./logger");

const sendCredentialEmail = (user,password, token) => {
    console.log("sendCredentialEmail");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.FROM_EMAIL,
      pass: process.env.EMAIL_PASSKEY,
    },
  });

  //Define Email Options
  const url = `${process.env.FORGET_PASSWORD_URL}?token=${token}`;
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: `${user.email}`,
    subject: "Update Password",
    html: `Hello ${user.username}<a href="${url}"> <p> Click Here to Update Pasword \n</p> </a>
    <p>\nEmail :- ${user.email} \n
    \nPassword :- ${password}</p>`
    ,
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });


};

module.exports = sendCredentialEmail;
