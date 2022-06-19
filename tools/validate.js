
var Joi = require("joi");
var emailValidator = require("email-validator"); // may need this later. 
var _ = require("underscore");
// const Render = require('.././non_restful_services/renders')

var joi_objects = {
  guest_id: Joi.number().integer().min(0),
};

// ------------------------------------------------------------


e = module.exports;

/* Having some trouble with this validation @ the moment */
e.validateEmail = function(email) {

  return (req, res, next) => {

    if(!emailValidator.validate(email)){
      return res.status(401).send('Unable to validate email')
    }

    next()
  }
};

// e.validateNewUser = () => {  
//   return (req, res, next) => {
//     user = req.body; 
//     const result = Joi.validate (user, _.pick(joi_objects, ["username", "email", "password", "guest_id"]));
//     if (result.error){
//       return res.status(401).send({ message: result.error.details[0].message })
//     } 
//     next()
//   }
// };

