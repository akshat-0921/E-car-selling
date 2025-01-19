import { body, param, validationResult } from 'express-validator';
import { Vehicle } from "../../models/vehicle.models.js";

const vechicleValidation = [
   body('name').notEmpty().withMessage('Name is required'),
   body('category')
      .notEmpty()
      .isIn(["Petrol", "Diesel", "CNG", "Electric", "Hybrid", "Hydrogen", "LPG", "Plug-in Hybrid", "Ethanol", "Biodiesel"])
      .withMessage('Invalid category. Valid categories are Petrol, Diesel, CNG, Electric, Hybrid, Hydrogen, LPG, Plug-in Hybrid, Ethanol, and Biodiesel'),
   body('performance.driveType')
      .optional()
      .isIn(["FWD", "RWD", "AWD", "4WD"])
      .withMessage('Invalid drive type. Valid options are FWD, RWD, AWD, and 4WD'),
   body('safetyFeatures.airbags')
      .optional()
      .isBoolean().withMessage('Airbags must be a boolean value (true/false)'),
   body('safetyFeatures.brakingSystem')
      .optional()
      .isIn(["ABS", "ESC", "AEB"])
      .withMessage('Invalid braking system. Valid options are ABS, ESC, and AEB'),
   body('safetyFeatures.cameraAndSensor')
      .optional()
      .isArray().withMessage('Camera and Sensor must be an array of strings'),
   body('connectivity.connectivity')
      .optional()
      .isArray().withMessage('Connectivity must be an array of strings'),
   body('connectivity.voiceControl')
      .optional()
      .isBoolean().withMessage('Voice Control must be a boolean value (true/false)'),
   body('customisation.color')
      .optional()
      .isArray().withMessage('Color must be an array of strings'),
   body('customisation.addOn')
      .optional()
      .isArray().withMessage('Add-ons must be an array of strings'),
];

const vehicleIdValidation = [
   param('_id')
      .isMongoId().withMessage('Invalid vehicle Id')
      .custom(async (value) => {
         const vehicleExists = await Vehicle.findById(value);  // Fix here
         if (!vehicleExists) {
            throw new Error('Vehicle not found');
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

export { vechicleValidation, vehicleIdValidation, handleValidationErrors };
