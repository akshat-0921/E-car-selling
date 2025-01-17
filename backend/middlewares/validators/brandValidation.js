import { body, validationResult } from "express-validator"

const brandValidation = [
   body('name').notEmpty().withMessage('Name is required'),
   body('logo').notEmpty().withMessage('Logo is required'),
   body('description').notEmpty().withMessage('Description is required'),
   (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty) {
         return res.status(400).json({ errors: errors.array() })
      }
      next()
   }
];

export const validateBrandId = [
   check("_id").isMongoId().withMessage("Invalid brand ID"),
   (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty) {
         return res.status(400).json({ errors: errors.array() })
      }
      next()
   }
];

export const handleValidationErrors = (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
   }
   next();
};

export { brandValidation, validateBrandId, handleValidationErrors }