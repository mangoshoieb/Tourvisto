import {Header} from "~/components";

const Trips = () => {
    return (
        <main className="dashboard wrapper">
            <Header
                desc={"view and create AI generated trips "}
                title={"Trips"}
                ctaUrl={'/trips/create'}
                ctaText={'Create A Trip'}
            />
        </main>
    )
}
export default Trips
