import { SERVER_URL } from "../config/env.js";
import { upstashWorkflowClient } from "../config/upstash-workflow.js";
import Subscription from "../model/subscription.model.js";

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });
        await upstashWorkflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: subscription._id,
            },
            headers: {
                "Content-Type": "application/json",
            },
            retries: 0,
        });

        res.status(201).json({
            success: true,
            message: "Subscription created successfully",
            data: subscription,
        });
    } catch (error) {
        next(error);
    }
};

export const getUserSubscriptions = async (req, res, next) => {
    try {
        // Check if the user is the same as the user in the params
        if (req.user.id !== req.params.id) {
            const error = "You are not the owner of this subscription";
            error.status = 401;
            throw new Error(error);
        }

        const subscriptions = await Subscription.find({ user: req.user._id });

        res.status(200).json({
            success: true,
            message: "Subscriptions fetched successfully",
            data: subscriptions,
        });
    } catch (error) {
        next(error);
    }
};

export const updateSubscription = async (req, res, next) => {
    try {
        // if (req.user.id !== req.params.id) {
        //     const error = "You are not the owner of this subscription";
        //     error.status = 401;
        //     throw new Error(error);
        // }

        const subscription = await Subscription.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json({
            success: true,
            message: "Subscription updated successfully",
            data: subscription,
        });
    } catch (error) {
        next(error);
    }
};
