import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateToken = (req, res, next) => {
    try{
            console.log('Authenticating token...');
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];

            if (!token) {
                return res.status(401).json({ message: "Access token is required" });
            }

            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    return res.status(403).json({ message: "Invalid or expired token" });
                }
                req.user = user;
                next();
            });


    }
    catch(err){
        console.error('Authentication error:', err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        try{
                const userRole = req.user.role;
                if (!allowedRoles.includes(userRole)) {
                    return res.status(403).json({ message: "Insufficient permissions" });
                }
                next();
        }
        catch(err){
            console.error('Authorization error:', err);
            return res.status(500).json({ message: "Internal server error" });
        }
    };
};