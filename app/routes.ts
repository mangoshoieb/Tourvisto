import {layout, route, type RouteConfig} from "@react-router/dev/routes";


export default [
    route('sign-in', 'routes/root/Sign-In.tsx'),
    route('api/create-trip','routes/api/create-trip.ts'),
    route('/', 'routes/home.tsx'),
    layout("routes/admin/admin-layout.tsx", [
        route("dashboard", "routes/admin/dashboard.tsx"),
        route("all-users", "routes/admin/all-users.tsx"),
        route("trips", "routes/admin/trips.tsx"),
        route("trips/create", "routes/admin/createTrips.tsx"),
    ]),
] satisfies RouteConfig;

