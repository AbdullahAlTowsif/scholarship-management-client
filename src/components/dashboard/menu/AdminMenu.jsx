import { MdManageHistory, MdReviews, MdSchool } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import MenuItem from "./MenuItem";
import { FaUsersCog } from "react-icons/fa";

const AdminMenu = () => {
    return (
        <>
            <MenuItem icon={MdManageHistory} label='Manage Scholarships' address='/dashboard/manage-scholarship'/>
            <MenuItem icon={MdReviews} label='All Reviews' address='/dashboard/all-reviews' />
            <MenuItem icon={IoCheckmarkDoneCircle} label='All Applied Scholarship' address='/dashboard/applied-scholarship' />
            <MenuItem icon={MdSchool} label='Add Scholarship' address='/dashboard/add-scholarship' />
            <MenuItem icon={FaUsersCog} label='Manage Users' address='/dashboard/manage-users' />
        </>
    )
}

export default AdminMenu;