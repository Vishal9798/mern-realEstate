import jwt from 'jsonwebtoken'  //get token from cookie
import { errorHandler } from './error.js';
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) return next(errorHandler(401, 'Unauthorized'));

    jwt.verify(token,process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, 'Forbidden'));

        req.user = user;
        next(); // after verify it will go to next middleware( updateUser) in user.route.js
    });
};