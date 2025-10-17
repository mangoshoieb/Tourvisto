import {Header} from "~/components";
import {ColumnDirective, ColumnsDirective, GridComponent,} from "@syncfusion/ej2-react-grids";
import {cn, formatDate} from "../../../lib/utils";
import {getAllUsers} from "~/appwrite/auth";
import type {Route} from './+types/all-users';

export const loader = async () => {
    const {users, total} = await getAllUsers(10, 0)
    return {users, total}
}

const AllUsers = ({loaderData}: Route.ComponentProps) => {
    const {users} = loaderData
    console.log(users)
    return (
        <main className="dashboard wrapper">
            <Header
                desc={"Filter, sort, and access detailed user profiles"}
                title={"Manage Users"}
            />
            <GridComponent dataSource={users}>
                <ColumnsDirective>
                    <ColumnDirective
                        field="name"
                        headerText="Name"
                        width="170"
                        textAlign="Left"
                        template={(props: UserData) => (
                            <div className="flex items-center gap-1.5 px-4">
                            
                                <img
                                    src={`${props.imageUrl}`}
                                    alt={props.name}
                                    className="size-8 rounded-full aspect-square"
                                />
                                <span>{props.name}</span>
                            </div>
                        )}
                    />
                    <ColumnDirective
                        field="email"
                        headerText="Email"
                        width="200"
                        textAlign="Left"
                    />
                    <ColumnDirective
                        field="joinedAt"
                        headerText="Date Joined"
                        width="150"
                        textAlign="Left"
                        template={({joinedAt}: { joinedAt: string }) => formatDate(joinedAt)}
                    />
                    <ColumnDirective
                        field="status"
                        headerText="Status"
                        width="100"
                        textAlign="Left"
                        template={({status}: UserData) => (
                            <article
                                className={cn(
                                    "status-column",
                                    status === "user" ? "!bg-success-100" : "!bg-light-500"
                                )}
                            >
                                <div
                                    className={cn(
                                        "size-1.5 rounded-full",
                                        status === "user" ? "!bg-success-500" : "!bg-gray-500"
                                    )}
                                />
                                <h3
                                    className={cn(
                                        "font-inter font-medium text-xs",
                                        status === "user" ? "!text-success-700" : "!text-gray-500"
                                    )}
                                >
                                    {status}
                                </h3>
                            </article>
                        )}
                    />
                </ColumnsDirective>
            </GridComponent>
        </main>
    );
};
export default AllUsers;
