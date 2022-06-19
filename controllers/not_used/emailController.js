


// const qStrings = require(".././tools/sqlStrings");
// const query = require(".././tools/queryDatabase");
// const dbFail = require(".././tools/dbFailSafe");

const nodemailer = require("nodemailer");   
var email_templates = require('email-templates'); /* MAYBE WE COULD WORK ON MAKING A TEMPLATE ???  */

// const Renders = require(".././non_restful_services/renders")
// const WEB_APP = process.env.WEB_APP || "http://localhost:5000";
// const API_URL = process.env.API_URL || "http://localhost:5001";
const EMAIL_IDENTITY = process.env.EMAIL_IDENTITY
const EMAIL_CREDENTIAL = process.env.EMAIL_CREDENTIAL
const NODE_ENVIRONMENT = process.env.NODE_ENVIRONMENT

const path = require('path'); // this is to be able to access file that will be an email attachment 

 var transporter = nodemailer.createTransport({
    host: "smtp.ionos.com",
    port:587,
    secure:false,
    auth:{
        user: EMAIL_IDENTITY,
        pass: EMAIL_CREDENTIAL
    }
  });


module.exports = {

    /* POST METHOD */
    /* For route, perhaps the validateEmail in validate.js can be called prior to calling this */
    /* I dont think I'll use 'templates' yet, even though I will add the NODE package for it */
    sendEmail : async(req,res) => {

        console.log('sendEmail called')

        b = req.body
        /* perhaps somewhere here we can grab a persons email */
        source_email = 'inmail@solaires.net' /* It seems that its possible to not show actual email */

        console.log(b)
        first_name = b.first_name
        last_name = b.last_name
        subject = b.subject
        inquirer_email = b.inquirer_email
        message = b.message
        inquiry_type = b.inquiry_type
    
        // inquirer_email = 'hectorandres.pv@gmail.com'

        console.log('first_name: ', first_name)
        console.log('last_name : ', last_name)
        console.log('subject : ', )
        console.log('inquirer email : ', inquirer_email)
        console.log('message: ', message)
        console.log('inquiry type: ', inquiry_type)

        subject_for_email = first_name + " " + last_name + " : " + subject
        text_to_send = "\n\nHi, we have received this message from you ! We will be in touch. \n\n" + "Your Message : \n\n "+ message + "\n\n" + "Your Email Address : \n\n "+ inquirer_email + "\n\n"
        test_text_to_send = "\n\n *** TEST by DEVELOPER (Adding routing to sales or general inquiries) *** \n\n This one is a : "+ inquiry_type +". \n\n Hi, we have received this message from you ! We will be in touch. \n\n" + "Your Message : \n\n "+ message + "\n\n" + "Your Email Address : \n\n "+ inquirer_email + "\n\n"

        console.log(text_to_send)

        if(inquiry_type == 'general_inquiry'){
          console.log("GENERAL INQUIRY, SETTING CORRECT DESTINATION EMAILS")
          email_destinations_array = ['hello@solaires.net','vanness@solaires.net', 'hector@solar-ventures.com', inquirer_email]
        }else{
          console.log('inquiry type should be sales , it is : ' , inquiry_type)
          console.log("SALES INQUIRY, SETTING CORRECT DESTINATION EMAILS")
          email_destinations_array = ['sales@solaires.net','vanness@solaires.net', 'hector@solar-ventures.com', inquirer_email]
        }

        if(NODE_ENVIRONMENT == 'production'){

          var mailOptions = {
            from: source_email,
            to: email_destinations_array,//,inquirer_email], // ,  Changing this so that the email also goes to the email input. //PROBLEM : What if they input it wrong? 
            subject: subject_for_email,
            text: text_to_send //it'd be nicer if we had a template, but this is internal, so it's okay.
          };

        }else{

          console.log("\n NODE_ENVIRONMENT is not Production so using this hardcoded email array instead !")

          var mailOptions = {
            from: source_email,
            to: ['hector@solar-ventures.com', 'vanness@solaires.net'], //this is so that in development environment vanness doesn't receive the email, or the inquirer email, as it will probably a dummy 
            subject: subject_for_email,
            text: test_text_to_send //it'd be nicer if we had a template, but this is internal, so it's okay.
          };

        }


        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              return res.status(400).send('Something went wrong with sending the email'); //It could end up here if the user input their email wrong so it couldn't send it .
            } else {
              console.log('Email sent: ' + info.response);
              return res.status(200).send(info.response);
            }
        });

    }

}