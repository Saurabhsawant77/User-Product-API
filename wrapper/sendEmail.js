require('dotenv').config();
var nodemailer = require('nodemailer');
const logger = require('./logger');


const sendEmail = (user,token) =>{
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port : process.env.EMAIL_PORT,

        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }

      });

      //Define Email Options
      const url = `${process.env.FORGET_PASSWORD_URL}?token=${token}`

      const emailOptions = {
        from : 'saurabh.sawant@wybrid.com',
        to : 'saurabh.sawant@wybrid.com',
        subject : 'Forget Password',
        html : `<a href="${url}"> <p> Click Here to Reset Pasword </p> </a>`
      }

      transporter.sendMail(emailOptions, function(error, info){
        if (error) {
          console.log(error);
          logger.info(error);
        } else {
          logger.info('Email sent: ' + info.response);
        }
      });

}

module.exports = {sendEmail}




