import {Header} from "~/components";

const AllUsers = () => {
    const user = {
        name: "Mango",
    };
    return (
        <main className="dashboard wrapper">
            <Header
                desc={"chek out our current users in real time "}
                title={"Trips guide"}
            />
            All users page Content
        </main>
    );
};
export default AllUsers;
