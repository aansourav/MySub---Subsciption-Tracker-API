import dayjs from "dayjs";
import { createRequire } from "module";
import Subscription from "../model/subscription.model.js";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");

export const sendReminders = serve(async (context) => {
    const REMINDER_DAYS = [7, 3, 1];

    const { subscriptionId } = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);

    if (!subscription || subscription.status !== "active") return;

    const renewalDate = dayjs(subscription.renewalDate);

    if (renewalDate.isBefore(dayjs())) {
        console.log(
            `Renewal date has passed for this subscription ${subscriptionId}. Stopping workflow `
        );
        return;
    }

    for (const daysBefore of REMINDER_DAYS) {
        const reminderDate = renewalDate.subtract(daysBefore, "days");

        if (reminderDate.isAfter(dayjs())) {
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
