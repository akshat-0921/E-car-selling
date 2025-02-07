import jwt from 'jsonwebtoken';
import { errorHandler } from '../../utils/errorHandler.utils.js';

const adminAuth = (req, res, next) => {
   const token = req.cookies?.accessToken || req.headers["authorization"]?.replace("Bearer ", "");

   if (!token) {
      return errorHandler(res, 401, "Unauthorized");
   }

   try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.adminId = decoded.adminId;
      next();
   } catch (error) {
      return errorHandler(res, 401, "Invalid or expired token");
   }
};