import {Header} from "~/components";

const Dashboard = () => {
    const user = {
        name: 'Mango'
    }
    return (
        <main className="dashboard wrapper">
            <Header
                title={`Hey ${user?.name ?? "Guest"} 👋`}
                desc={"Track Activities , Tends and popular destinations in real time"}
            />
            Dashboard page Content
        </main>
    );
};
export default Dashboard;
