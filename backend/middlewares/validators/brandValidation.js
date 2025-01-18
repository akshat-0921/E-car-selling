import { body, param, validationResult } from "express-validator";

const brandValidation = [
   body('name').notEmpty().withMessage('Name is required'),
   // body('logo').notEmpty().withMessage('Logo is required'),
   body('description').notEmpty().withMessage('Description is required'),
];

const brandIdValidation = [
   param('_id')
      .isMongoId().withMessage('Invalid brand ID')
      .custom(async (value) => {
         const brandExists = await Brand.exists({ _id: value });
         if (!brandExists) {
            throw new Error('Brand not found');
         }
      }),
];

const handleValidationErrors = (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
   }
   next();
};

export { brandValidation, brandIdValidation, handleValidationErrors };
