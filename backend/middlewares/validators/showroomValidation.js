import { body, param, validationResult } from 'express-validator';

const ShowroomValidation = [
   body('name').notEmpty().withMessage('Name is required'),
   body('address').notEmpty().withMessage('Address is required'),
   body('city').notEmpty().withMessage('City is required'),
   body('state').notEmpty().withMessage('State is required'),
   body('zipCode').notEmpty().withMessage('ZipCode is required'),
   body('contactNumber')
      .notEmpty().withMessage('Contact number is required')
      .isLength({ min: 10 }).withMessage('Contact number must be at least 10 characters')
      .matches(/^\d+$/).withMessage('Contact number must contain only digits'), // Matches only numbers
   body('lat').notEmpty().withMessage('Latitude is required'),
   body('lon').notEmpty().withMessage('Longitude is required'),
];

const showroomIdValidation = [
   param('_id')
      .isMongoId().withMessage('Invalid brand ID')
      .custom(async (value) => {
         const showroomExists = await Showroom.exists({ _id: value });
         if (!showroomExists) {
            throw new Error('Showroom not found');
         }
      }),
]


export { ShowroomValidation, showroomIdValidation };
