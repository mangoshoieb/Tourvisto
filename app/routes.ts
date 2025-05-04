import {layout, route, type RouteConfig} from "@react-router/dev/routes";

export default [
    redirect("/", "/dashboard"),
    layout("routes/admin/admin-layout.tsx", [
        route("dashboard", "routes/admin/dashboard.tsx"),
        route("all-users", "routes/admin/all-users.tsx"),
        route("trips", "routes/admin/trips.tsx"),
    ]),
] satisfies RouteConfig;
