import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

// Protected Routes Token Based
export const requireSignIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ success: false, message: 'Authorization header is missing' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(401).send({ success: false, message: 'Unauthorized' });
    }
    req.user = user; // Attach the user object
    next();
  } catch (error) {
    res.status(401).send({ success: false, message: 'Unauthorized', error });
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