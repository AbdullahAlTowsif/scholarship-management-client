import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Navbar from "../../../components/common/Navbar";

const ScholarshipDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: scholarship, isLoading, error } = useQuery({
        queryKey: ["scholarship", id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/scholarship/${id}`);
            return data
        }
    });

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (error) {
        return <p className="text-center text-red-500">Failed to load scholarship details</p>;
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold text-center text-[#890C25] mb-6">Scholarship Details</h1>
                <div className="bg-white shadow-lg rounded-lg p-6 space-y-3">
                    <h1 className="text-4xl font-bold text-center mb-5 text-[#89890C]">{scholarship.scholarshipName}</h1>
                    <img src={scholarship.image} alt={scholarship.universityName} className="w-full h-96 object-cover rounded-md" />
                    <h2 className="text-3xl font-bold mt-4">{scholarship.universityName}</h2>
                    <h5 className="text-2xl font-bold text-[#890C25]"><span className="font-semibold text-xl text-[#89890C]">University Country: </span>{scholarship.universityCountry}</h5>
                    <h5 className="text-2xl font-bold text-[#890C25]"><span className="font-semibold text-xl text-[#89890C]">University City: </span>{scholarship.universityCity}</h5>
                    <h5 className="text-2xl font-bold text-[#890C25]"><span className="font-semibold text-xl text-[#89890C]">University Rank: </span> {scholarship.universityRank}</h5>
                    <h5 className="text-2xl font-bold text-[#890C25]"><span className="font-semibold text-xl text-[#89890C]">Subject Category: </span>{scholarship.subjectCategory}</h5>
                    <h5 className="text-2xl font-bold text-[#890C25]"><span className="font-semibold text-xl text-[#89890C]">Scholarship Category: </span>{scholarship.scholarshipCategory}</h5>
                    <h5 className="text-2xl font-bold text-[#890C25]"><span className="font-semibold text-xl text-[#89890C]">Degree: </span>{scholarship.degree}</h5>
                    <h5 className="text-2xl font-bold text-[#890C25]"><span className="font-semibold text-xl text-[#89890C]">Tution Fees: </span>{scholarship.tutionFees}</h5>
                    <h5 className="text-2xl font-bold text-[#890C25]"><span className="font-semibold text-xl text-[#89890C]">Application Fees: </span>{scholarship.aplicationFees}</h5>
                    <h5 className="text-2xl font-bold text-[#890C25]"><span className="font-semibold text-xl text-[#89890C]">Service Charge: </span>{scholarship.serviceCharge}</h5>
                    <h5 className="text-2xl font-bold text-red-600"><span className="font-semibold text-xl text-red-500">Application Deadline: </span>{scholarship.applicationDeadline}</h5>
                    <h5 className="text-2xl font-bold text-[#890C25]"><span className="font-semibold text-xl text-[#89890C]">Posted Date: </span>{scholarship.scholarshipPostDate}</h5>
                    <h5 className="text-2xl font-bold text-[#890C25]"><span className="font-semibold text-xl text-[#89890C]">Posted Email: </span>{scholarship.postedUserEmail}</h5>
                    <button className="btn bg-[#890C25] text-white mt-6 w-full">Apply for Scholarship</button>
                </div>
            </div>
        </div>
    );
};

export default ScholarshipDetails;
