import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

// Protected Routes Token Based
export const requireSignIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await userModel.findById(decoded._id);
        next();
    } catch (error) {
        res.status(401).send({
            success: false,
            message: 'Unauthorized Access',
            error
        });
    }
};

// Admin
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized User"
            });
        } else {
            next();
        }
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: `Error in Admin Middleware ${error}`,
        });
    }
};