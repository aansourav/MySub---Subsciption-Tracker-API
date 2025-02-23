import User from "../model/user.model.js";

export const getUsers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const totalUsers = await User.countDocuments();
        const users = await User.find()
            .select("-password")
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users,
            pagination: {
                total: totalUsers,
                limit: limit,
                totalPages: Math.ceil(totalUsers / limit),
                currentPage: page,
                hasNextPage: skip + limit < totalUsers,
                hasPreviousPage: page > 1,
                nextPage: skip + limit < totalUsers ? page + 1 : null,
                previousPage: page > 1 ? page - 1 : null,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const userId = req.params;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};
