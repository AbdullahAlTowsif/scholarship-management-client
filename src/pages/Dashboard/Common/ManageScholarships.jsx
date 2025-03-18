import { useQuery } from "@tanstack/react-query";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../components/common/LoadingSpinner";

const ManageScholarships = () => {
    const axiosSecure = useAxiosSecure();

    const { data: scholarships = [], isLoading, error } = useQuery({
        queryKey: ["scholarships"],
        queryFn: async () => {
            const { data } = await axiosSecure.get("/scholarship");
            return data;
        }
    });


    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (error) {
        return <p className="text-center text-red-500">Failed to load scholarships</p>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center text-[#890C25] mb-6">Manage Scholarships</h1>
            <div className="overflow-x-auto">
                <table className="table w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 border">Scholarship Name</th>
                            <th className="p-3 border">University Name</th>
                            <th className="p-3 border">Subject Category</th>
                            <th className="p-3 border">Applied Degree</th>
                            <th className="p-3 border">Application Fees</th>
                            <th className="p-3 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scholarships.map((scholarship) => (
                            <tr key={scholarship.id} className="border hover:bg-base-300">
                                <td className="p-3 border">{scholarship.scholarshipName}</td>
                                <td className="p-3 border">{scholarship.universityName}</td>
                                <td className="p-3 border">{scholarship.subjectCategory}</td>
                                <td className="p-3 border">{scholarship.degree}</td>
                                <td className="p-3 border">${scholarship.aplicationFees}</td>
                                <td className="p-3 border flex gap-3 justify-center">
                                    <Link to={`/scholarship/${scholarship._id}`} className="btn btn-info btn-sm">
                                        <FaEye />
                                    </Link>
                                    <button className="btn btn-warning btn-sm">
                                        <FaEdit />
                                    </button>
                                    <button className="btn btn-error btn-sm">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageScholarships;
