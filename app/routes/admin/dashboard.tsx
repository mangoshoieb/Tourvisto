import {Header} from "~/components";
import StatsCard from "~/components/StatsCard";
import {allTrips, dashboardStats} from "~/constants";
import TripsCard from "~/components/TripsCard";
import {getUser} from "~/appwrite/auth";
import type {Route} from './+types/dashboard'

export const clientLoader = async () => await getUser()

export async function loader() {
    throw new Error("some error thrown in a loader");
}

const dashboard = ({loaderData}: Route.ComponentProps) => {
    const user = loaderData as User | null;

    const {totalUsers, usersJoined, totalTrips, tripsCreated, userRole} =
        dashboardStats;
    return (
        <main className="dashboard wrapper">
            <Header
                title={`Hey ${user?.name ?? "Guest"} 👋`}
                desc={"Track Activities , Tends and popular destinations in real time"}
            />
            <section className="flex flex-col gap-6 ">
                <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-6">
                    <StatsCard
                        headerTitle={"Total Users"}
                        total={totalUsers}
                        currentMonthCount={usersJoined.currentMonth}
                        lastMonthCount={usersJoined.lastMonth}
                    />
                    <StatsCard
                        headerTitle={"Total Trips"}
                        total={totalTrips}
                        currentMonthCount={tripsCreated.currentMonth}
                        lastMonthCount={tripsCreated.lastMonth}
                    />{" "}
                    <StatsCard
                        headerTitle={"Active Users"}
                        total={userRole.total}
                        currentMonthCount={userRole.currentMonth}
                        lastMonthCount={userRole.lastMonth}
                    />
                </div>
            </section>
            <section className='container'>
                <h1 className='text-xl font-semibold text-dark-100
                '>
                    Created Trips
                </h1>

                <div className='trip-grid'>
                    {allTrips.slice(0, 4).map(({id, name, imageUrls, tags, estimatedPrice, itinerary}) => (
                        <TripsCard
                            name={name}
                            key={id}
                            id={id.toString()}
                            tags={tags}
                            location={itinerary?.[0]?.location ?? ''}
                            price={estimatedPrice}
                            imageUrl={imageUrls[0]}
                        />
                    ))
                    }
                </div>

            </section>
        </main>
    );
};
export default dashboard;
