import Joi from 'joi';

const validSchema={
 validSchemaSignup : Joi.object({
  userName: Joi.string().pattern(/^[a-zA-Z0-9]{3,15}$/).required()
  .messages({
    'string.pattern.base': 'Username must only contain alphanumeric characters and be between 3 and 15 characters long',
    'string.empty': 'Username is a required field'
  })
  ,
  email: Joi.string().email().required()
  .messages({
    'string.email': 'Please provide a valid email address',
    'string.empty': 'Email is a required field'
  })
  ,
   password: Joi.string().pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,30}$/).required()
  .messages({
    'string.pattern.base': 'Password must be between 6 and 30 characters long and contain only alphanumeric characters and special characters',
    'string.empty': 'Password is a required field'
  })
  ,
  age: Joi.number().integer().min(18).max(99).required()
  .messages({
    'number.integer': 'Age must be an integer',
    'number.min': 'Age must be between 18 and 99 years old',
    'number.max': 'Age must be between 18 and 99 years old',
    'number.empty': 'Age is a required field'
  })
  ,
  gender: Joi.string().valid('male', 'female', 'other').required()
  .messages({
    'string.valid': 'Please provide a valid gender',
    'string.empty': 'Gender is a required field'
  })
  ,
  phone_number: Joi.string().pattern(/^(011|012|015|010)[0-9]{8}$/).required()
  .messages({
    'string.pattern.base': 'Please provide a valid phone number',
    'string.empty': 'Phone is a required field'
  })
})
,
// for sign in
 validSchemaSignIn : Joi.object({
  password: Joi.string().pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,30}$/).required()
  .messages({
    'string.pattern.base': 'Password must be between 6 and 30 characters long and contain only alphanumeric characters and special characters',
    'string.empty': 'Password is a required field'
  })
  ,
  email: Joi.string().email().required()
  .messages({
    'string.email': 'Please provide a valid email address',
    'string.empty': 'Email is a required field'
  })
})}
export default validSchema