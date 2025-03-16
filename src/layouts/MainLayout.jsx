import Navbar from "../components/common/Navbar";

const MainLayout = () => {
    return (
        <div>
            <div className="sticky top-0 z-10 bg-opacity-40">
                <Navbar></Navbar>
            </div>
        </div>
    );
};

export default MainLayout;