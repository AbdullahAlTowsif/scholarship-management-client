import { MdReviews } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa6";
import MenuItem from "./MenuItem";

const UserMenu = () => {
    return (
        <>
            <MenuItem icon={FaBookOpen} label='My Application' address='/dashboard/my-application' />
            <MenuItem icon={MdReviews} label='My Reviews' address='/dashboard/all-reviews' />
        </>
    );
};

export default UserMenu;