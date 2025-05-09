import * as Sentry from "@sentry/react-router";
import {nodeProfilingIntegration} from '@sentry/profiling-node';

Sentry.init({
    dsn: "https://8fd514a7fc1c12c08ccf16fefc392544@o4508127619842048.ingest.us.sentry.io/4509259657838592",

    // Adds request headers and IP for users, for more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#sendDefaultPii
    sendDefaultPii: true,

    integrations: [nodeProfilingIntegration()],
    tracesSampleRate: 1.0, // Capture 100% of the transactions
    profilesSampleRate: 1.0, // profile every transaction
});

