import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/errorHandler.utils.js';

export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

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
