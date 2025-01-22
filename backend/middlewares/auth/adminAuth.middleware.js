import jwt from 'jsonwebtoken';
import { errorHandler } from '../../utils/errorHandler.utils.js';

export const adminAuth = (req, res, next) => {
   const token = req.cookies.adminToken || req.headers.authorization?.split(' ')[1];

   if (!token) {
      return errorHandler(res, 401, "Access denied. No token provided");
   }

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.adminId = decoded.adminId;
      next();
   } catch (error) {
      return errorHandler(res, 400, "Invalid token");
   }
};

