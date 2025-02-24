import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");

export const sendReminders = serve(async (req, res) => {
    console.log("Received request:", req.body);
    res.send("Reminder sent");
});
