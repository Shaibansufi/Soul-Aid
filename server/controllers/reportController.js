import reportModel from "../models/reportModel.js";

// Create Report || Post
export const createReportController = async (req, res) => {
    try {
        const { reportedUser, reason } = req.body;
        const report = new reportModel({ reportedBy: req.user._id, reportedUser, reason });
        await report.save();
        res.status(201).send({
            success: true,
            message: 'Report Created Successfully',
            report
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Creating Report',
            error
        });
    }
};

// Get User Reports || Get
export const getUserReportsController = async (req, res) => {
    try {
        const reports = await reportModel.find({ reportedBy: req.user._id }).populate('reportedBy reportedUser');
        res.status(200).send({
            success: true,
            message: 'User Reports Fetched Successfully',
            reports
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Fetching User Reports',
            error
        });
    }
};

// Get All Reports || Get
export const getAllReportsController = async (req, res) => {
    try {
        const reports = await reportModel.find({}).populate('reportedBy reportedUser');
        res.status(200).send({
            success: true,
            message: 'All Reports Fetched Successfully',
            reports
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Fetching All Reports',
            error
        });
    }
};

// Update Report Status || Put
export const updateReportStatusController = async (req, res) => {
    try {
        const { status } = req.body;
        const report = await reportModel.findByIdAndUpdate(req.params.reportId, { status }, { new: true });
        res.status(200).send({
            success: true,
            message: 'Report Status Updated Successfully',
            report
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Updating Report Status',
            error
        });
    }
};
