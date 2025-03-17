import { MdManageHistory, MdReviews, MdSchool } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import MenuItem from "./MenuItem";

const ModeratorMenu = () => {
    return (
        <>
            <MenuItem icon={MdManageHistory} label='Manage Scholarships' address='/dashboard/manage-scholarship'/>
            <MenuItem icon={MdReviews} label='All Reviews' address='/dashboard/all-reviews' />
            <MenuItem icon={IoCheckmarkDoneCircle} label='All Applied Scholarship' address='/dashboard/applied-scholarship' />
            <MenuItem icon={MdSchool} label='Add Scholarship' address='/dashboard/add-scholarship' />
        </>
    );
};

export default ModeratorMenu;