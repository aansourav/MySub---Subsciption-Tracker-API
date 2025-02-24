import { Client as UpstashWorkflowClient } from "@upstash/workflow";
import { QSTASH_URL, QSTASH_TOKEN, QSTASH_CURRENT_SIGNING_KEY, QSTASH_NEXT_SIGNING_KEY } from "./env.js";

export const upstashWorkflowClient = new UpstashWorkflowClient({
    baseUrl: QSTASH_URL,
    token: QSTASH_TOKEN,
});

