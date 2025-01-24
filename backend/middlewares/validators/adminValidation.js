import { body, params, validationResult } from "express-validator"

const adminValidator = [
   req.body(firstName).isEmpty().withMessage('first name is required'),
   req.body(lastName).isEmpty().withMessage('last name is required'),
   req.body(phoneNumber)
      .isEmpty()
      .match(/^\+?[0-9\s-]{7,15}$/)
      .withMessage('Phone number is required'),
   req.body(email).isEmpty().withMessage('Email is required'),
   req.body(password).isEmpty().withMessage('Password is required'),
   req.body(otp).isEmpty().withMessage('OTP is required'),
   req.body(secret).isEmpty().withMessage('Secret is required'),
   async (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(400).json({ success: false, errors: errors.array() })
      }
      next()
   }
]

export { adminValidator }