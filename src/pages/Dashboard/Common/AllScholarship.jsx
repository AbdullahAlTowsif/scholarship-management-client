import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Navbar from "../../../components/common/Navbar";
import { Link } from "react-router-dom";

const AllScholarship = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const axiosSecure = useAxiosSecure();

    const { data: scholarships = [], isLoading, error } = useQuery({
        queryKey: ["scholarships"],
        queryFn: async () => {
            const { data } = await axiosSecure.get("/scholarship");
            return data;
        }
    });

    const filteredScholarships = scholarships.filter(scholarship =>
        scholarship.scholarshipName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholarship.universityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholarship.degree.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Navbar></Navbar>
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold text-center text-[#890C25] mb-6">All Scholarships</h1>

                {/* Search Box */}
                <div className="flex justify-center mb-6">
                    <input
                        type="text"
                        placeholder="Search by Scholarship, University, or Degree"
                        className="input input-bordered w-full max-w-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="btn bg-[#89890C] text-white ml-2">
                        <FaSearch />
                    </button>
                </div>

                {/* Scholarship Cards */}
                {isLoading ? (
                    <p className="text-center text-gray-500">Loading scholarships...</p>
                ) : error ? (
                    <p className="text-center text-red-500">Failed to load scholarships</p>
                ) : (
                    <div className="grid md:grid-cols-3 gap-6">
                        {filteredScholarships.length > 0 ? (
                            filteredScholarships.map(scholarship => (
                                <div key={scholarship.id} className="card bg-white shadow-lg rounded-lg p-4">
                                    <img src={scholarship.image} alt={scholarship.universityName} className="w-full h-40 object-cover rounded-md" />
                                    <h3 className="text-xl font-semibold mt-4">{scholarship.scholarshipName}</h3>
                                    <p className="text-gray-700">{scholarship.universityName}</p>
                                    <p className="text-red-500">Deadline: {scholarship.applicationDeadline}</p>
                                    <Link className="btn bg-[#890C25] text-white mt-4" to={`/scholarship/${scholarship._id}`}>View Details</Link>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500">
                                <p>No scholarships available</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllScholarship;
