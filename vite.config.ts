import tailwindcss from "@tailwindcss/vite";
import {reactRouter} from "@react-router/dev/vite";
import {sentryReactRouter, type SentryReactRouterBuildOptions,} from "@sentry/react-router";
import {defineConfig} from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
//
// export default defineConfig({
//   plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
//   ssr:{
//     noExternal: [/@syncfusion/]
//   }
// });

const sentryConfig: SentryReactRouterBuildOptions = {
    org: "mango-mq",
    project: "tourvisto",
    // An auth token is required for uploading source maps.
    authToken:
        "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",
    // ...
};
export default defineConfig((config) => {
    return {
        plugins: [
            tailwindcss(),
            reactRouter(),
            tsconfigPaths(),
            sentryReactRouter(sentryConfig, config),
        ],
        sentryConfig,
        ssr: {
            noExternal: [/@syncfusion/],
        },
    };
});
