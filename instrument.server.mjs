import * as Sentry from "@sentry/react-router";
import {nodeProfilingIntegration} from '@sentry/profiling-node';

Sentry.init({
    dsn: "https://b7480b52f5d1696e5a8c1a0ac463b580@o4508127619842048.ingest.us.sentry.io/4508127621087232",

    // Adds request headers and IP for users, for more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#sendDefaultPii
    sendDefaultPii: true,

    integrations: [nodeProfilingIntegration()],
    tracesSampleRate: 1.0, // Capture 100% of the transactions
    profilesSampleRate: 1.0, // profile every transaction
});
