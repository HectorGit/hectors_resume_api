const express = require("express");
const postrouter = express.Router();

const query = require(".././tools/queryDatabase");
const qStrings = require(".././tools/sqlStrings");
const val = require(".././tools/validate");
const dbFail = require(".././tools/dbFailSafe");
const moment = require("moment");

const friendsController = require('../controllers/friendsController');
const emailController = require('../controllers/emailController')


//needed to make request to recaptcha API 
const axios = require('axios');
const jsonwebtoken = require('jsonwebtoken'); //NEW - FOR GOOGLE SIGN IN
var google_signin_secret =  process.env.GOOGLE_SIGN_IN_SECRET;

//careful here, include method postrouter.post

/* requires body such as
    { 
        first_name,
        last_name,
        age
    }
*/
postrouter.post("/create_friend",
    friendsController.createFriend
);

/*
    COMMENTED OUT TEMPORARILY 
    AS FOR SAFETY .

    IT WORKS, HOWEVER, 
    BUT GOOGLE EMAIL SETTINGS 
    NEED TO BE CHANGED 

    requires body such as
    {
        "destination_email" = "example@email.com"
    }
*/
postrouter.post("/send_email",
    // val.validateEmail(req.body.destination_email),
    function ( req, res, next) {
        var b = req.body;
        console.log("preprocessing: \n")
        console.log(b)
        return next()
    },
    emailController.sendEmail
);

postrouter.post("/api_validate_captcha",
    async(req,res) => {
        
        console.log('/api_validate_captcha initiated')

        param_config = {
            "secret": process.env.RECAPTCHA_SECRET_KEY,
            "response": req.body.g_recaptcha_response
        }
        
        url = 'https://www.google.com/recaptcha/api/siteverify'

        console.log('About to make Request to : ' , url)
        console.log('\nWith param config : ' , param_config )

        // return res.status(200).send({'success':true, 'response':{'a':'a', 'b':'b', 'c':'c'} })

        axios.post(url, {/* data */}, {params:param_config})
          .then(function (response) {
            console.log('Axios then clause')
            console.log(response.data);
            return res.status(200).send(response.data) //{'success':true, 'response' : response.data}
          })
          .catch(function (error) {
            console.log('Axios catch clause')
            console.log(error);
            return res.status(400).send({'success':false})
          });


    }
);

postrouter.post("/decode_google_token",
    async(req,res) => {
        console.log("called /decode_google_token in the API ")

        json_web_token = req.body.json_web_token

        console.log("json_web_token " , json_web_token)
        console.log("typeof json_web_token " , typeof(json_web_token))

        // decoded = jsonwebtoken.decode(json_web_token)

        // console.log("decoded header : ", decoded.header)
        // console.log("decoded payload : ", decoded.payload)
        console.log("\n google_signin_secret : ", google_signin_secret)
        console.log("typeof google_signin_secret ", typeof(google_signin_secret))


        // jsonwebtoken.verify(json_web_token, google_signin_secret, function(err, decoded) {
            
        //     if (err) {
        //         console.log(err)
        //         return res.status(400)
        //     }

        //     console.log('decode_google_token verification worked .')

        //     console.log("decoded.header : ", decoded.header)
        //     console.log("decoded.payload : ", decoded.payload)

        //     return res.status(200).send("payload": decoded.payload)
        // });

        var decoded = jsonwebtoken.decode(json_web_token, {complete: true});

        if(decoded == null){
            console.log("api --- the token was unable to be decoded");
            return res.status(400).send({"payload":''})
        }else{ //the payload was able to be decoded .
            console.log("api --- the token was able to be decoded");
            console.log(decoded.header);
            console.log(decoded.payload)
            return res.status(200).send({"payload":decoded.payload})
        }

    }
);


module.exports = postrouter;