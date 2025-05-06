// @ts-nocheck
import {Link} from "react-router";
import {SidebarComponent} from "@syncfusion/ej2-react-navigations";
import {Navitems} from "~/components/index";

const MobileSidebar = () => {
    let sidebar = SidebarComponent;
    const SidebarToggle = () => {
        sidebar.toggle();
    };
    return (
        <div className="mobile-sidebar wrapper">
            <header>
                <Link to="/" className="link-logo">
                    <img
                        src="/assets/icons/logo.svg"
                        alt="logo"
                        className="size-[30px]"
                    />
                    <h1>Tourvisto</h1>
                </Link>
                <button onClick={SidebarToggle}>
                    <img src="/assets/icons/menu.svg" alt="menue" className="size-7"/>
                </button>
            </header>
            <SidebarComponent
                ref={(Sidebar) => (sidebar = Sidebar)}
                width={270}
                closeOnDocumentClick={true}
                created={() => sidebar.hide()}
                showBackdrop={true}
            >
                <Navitems handleClick={SidebarToggle}/>
            </SidebarComponent>
        </div>
    );
};
export default MobileSidebar;
