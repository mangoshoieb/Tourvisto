import { Header } from "~/components";
import type { Route } from "./+types/trips";
import { useSearchParams, type LoaderFunctionArgs } from "react-router";
import { parseTripData } from "lib/utils";
import { getAllTrips } from "~/appwrite/trips";
import TripsCard from "~/components/TripsCard";
import { useState } from "react";
import { PagerComponent } from "@syncfusion/ej2-react-grids";
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const limit = 8;
  console.log(request)
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const offset = (page - 1) * limit;

  const { allTrips, total } = await getAllTrips(limit, offset);

  return {
    trips: allTrips.map(({ $id, tripDetail, imageUrls }) => ({
      id: $id,
      ...parseTripData(tripDetail),
      imageUrls: imageUrls ?? [],
    })),
    total,
  };
};

const Trips = ({ loaderData }: Route.ComponentProps) => {
    const trips = loaderData.trips as Trip[] | [];

    const [searchParams] = useSearchParams();
    const initialPage = Number(searchParams.get('page')|| '1')

    const [currentPage, setcurrentPage] = useState(initialPage)

    const handlePageChanges = (page:number) =>{
        setcurrentPage(page);
        window.location.search= `?page=${page}`
    }
  return (
    <main className="dashboard wrapper">
      <Header
        desc={"view and create AI generated trips "}
        title={"Trips"}
        ctaUrl={"/trips/create"}
        ctaText={"Create A Trip"}
      />
      <section>
        <h1 className="p-24-semibold text-dark-100 mb-4">

        </h1>
        <div className="trip-grid mb-4">
          {trips.map((trip) => (
            <TripsCard
              key={trip.id}
              id={trip.id}
              name={trip.name}
              imageUrl={trip.imageUrls[0]}
              location={trip.itinerary?.[0]?.location ?? ""}
              tags={[trip.interests, trip.travelStyle]}
              price={trip.estimatedPrice}
            />
          ))}
        </div>

        <PagerComponent
        totalRecordsCount={loaderData.total}
        currentPage={currentPage}
        click={(args)=> handlePageChanges(args.currentPage)}
        cssClass="!mb-4"
        />
      </section>
    </main>
  );
};
export default Trips;
