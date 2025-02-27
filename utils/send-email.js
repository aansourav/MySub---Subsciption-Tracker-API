import dayjs from "dayjs";
import transporter, { accountEmail } from "../config/nodemailer.js";
import { emailTemplates } from "./email-template.js";
import { SERVER_URL } from "./env.js";

export const sendReminderEmail = async ({ to, type, subscription }) => {
    if (!to || !type) throw new Error("Missing required parameters");
    const template = emailTemplates.find((t) => t.label === type);
    if (!template) throw new Error("Invalid template type");

    const mailInfo = {
        userName: subscription.user.name,
        subscriptionName: subscription.name,
        renewalDate: dayjs(subscription.renewalDate).format("MMM D YYYY"),
        planName: subscription.name,
        price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
        paymentMethod: subscription.paymentMethod,
        accountSettingsLink: `${SERVER_URL}/account-settings`,
        supportLink: `${SERVER_URL}/support`,
    };

    const message = template.generateBody(mailInfo);
    const subject = template.generateSubject(mailInfo);

    const mailOptions = {
        from: accountEmail,
        to,
        subject,
        html: message,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error, "Error sending email");
        } else {
            console.log(`Email sent: ${info.response}`);
        }
    });
};
