import userModel from "../models/userModel.js";

// Get User Profile || Get
export const getUserProfileController = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id).select("-password");
        res.status(200).send({
            success: true,
            message: 'User Profile Fetched Successfully',
            user
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Fetching User Profile',
            error
        });
    }
};

// Update User Profile || Put
export const updateUserProfileController = async (req, res) => {
    try {
        const { name, email, phone, address, interests } = req.body;

        const user = await userModel.findById(req.user._id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }

        // Update user fields
        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.address = address || user.address;
        user.interests = interests || user.interests;

        await user.save();

        res.status(200).send({
            success: true,
            message: "User profile updated successfully",
            user,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error updating user profile",
            error,
        });
    }
};

// Get All Users || Get
export const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find({}).select("-password");
        res.status(200).send({
            success: true,
            message: 'All Users Fetched Successfully',
            users
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Fetching All Users',
            error
        });
    }
};

// Delete User || Delete
export const deleteUserController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.userId);
        res.status(200).send({
            success: true,
            message: 'User Deleted Successfully'
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Deleting User',
            error
        });
    }
};
