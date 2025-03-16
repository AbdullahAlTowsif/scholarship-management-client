import Navbar from "../components/common/Navbar";
import Banner from "../components/home/Banner";

const MainLayout = () => {
    return (
        <div>
            <div className="sticky top-0 z-10 bg-opacity-40">
                <Navbar></Navbar>
            </div>
            <Banner></Banner>
        </div>
    );
};

export default MainLayout;