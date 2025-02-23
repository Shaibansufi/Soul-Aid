import projectModel from "../models/projectModel.js";
import sessionModel from "../models/sessionModel.js";
import resourceModel from "../models/resourceModel.js";

// Get User Projects || Get
export const getUserProjectsController = async (req, res) => {
    try {
        const projects = await projectModel.find({ user: req.user._id });
        res.status(200).send({
            success: true,
            message: 'User Projects Fetched Successfully',
            projects
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Fetching User Projects',
            error
        });
    }
};

// Get User Sessions || Get
export const getUserSessionsController = async (req, res) => {
    try {
        const sessions = await sessionModel.find({ user: req.user._id });
        res.status(200).send({
            success: true,
            message: 'User Sessions Fetched Successfully',
            sessions
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Fetching User Sessions',
            error
        });
    }
};

// Get Resources || Get
export const getResourcesController = async (req, res) => {
    try {
        const resources = await resourceModel.find({});
        res.status(200).send({
            success: true,
            message: 'Resources Fetched Successfully',
            resources
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Fetching Resources',
            error
        });
    }
};
