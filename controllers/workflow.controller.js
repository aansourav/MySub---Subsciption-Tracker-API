import dayjs from "dayjs";
import { createRequire } from "module";
import Subscription from "../model/subscription.model.js";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");

export const sendReminders = serve(async (context) => {
    const REMINDER_DAYS = [7, 3, 1];

    const { subscriptionId } = context.requestPayload;

    if (!subscriptionId || typeof subscriptionId !== "string") {
        console.error("Invalid subscriptionId:", subscriptionId);
        return;
    }

    let subscription;
    try {
        subscription = await fetchSubscription(context, subscriptionId);
    } catch (error) {
        console.error("Error fetching subscription:", error);
        return;
    }

    if (!subscription || subscription.status !== "active") {
        console.log(
            `Subscription ${subscriptionId} is not active or not found`
        );
        return;
    }

    const renewalDate = dayjs(subscription.renewalDate);
    const now = dayjs();

    if (renewalDate.isBefore(now)) {
        console.log(
            `Renewal date has passed for subscription ${subscriptionId}. Stopping workflow`
        );
        return;
    }

    for (const daysBefore of REMINDER_DAYS) {
        const reminderDate = renewalDate.subtract(daysBefore, "days");

        if (reminderDate.isBefore(now)) {
            console.log(
                `Skipping ${daysBefore} day reminder as it's already past`
            );
            continue;
        }

        await sleepUntilReminder(
            context,
            `Reminder - ${daysBefore} days before renewal`,
            reminderDate
        );

        try {
            await triggerReminder(
                context,
                `Reminder - ${daysBefore} days before renewal`
            );
        } catch (error) {
            console.error(
                `Error triggering ${daysBefore} day reminder:`,
                error
            );
        }
    }
});

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run("get subscription", () => {
        return Subscription.findById(subscriptionId).populate(
            "user",
            "name email"
        );
    });
};

const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label) => {
    return await context.run(label, () => {
        console.log(`Triggering ${label} reminder`);
    });
};
