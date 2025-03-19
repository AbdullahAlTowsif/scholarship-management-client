import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_key);

const Payment = () => {
    const { id } = useParams(); // Class ID
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // Fetch class details using TanStack Query
    const { data: ScholarshipDetails, isLoading } = useQuery({
        queryKey: ["ScholarshipDetails", id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/scholarship/${id}`);
            return data;
        },
    });

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (ScholarshipDetails?.postedUserEmail === user?.email) {
        return toast.error("You can not pay for this class")
    }

    return (
        <Elements stripe={stripePromise}>
            <div className="container mx-auto py-10 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Scholarship Details Section */}
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                        <img
                            src={ScholarshipDetails.image}
                            alt={ScholarshipDetails.ScholarshipName}
                            className="w-full h-64 object-cover rounded-lg mb-4"
                        />
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">{ScholarshipDetails.ScholarshipName}</h2>
                        <p className="text-gray-700 mb-2">
                            <strong>Posted User:</strong> {ScholarshipDetails?.postedUserEmail}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Tution Fees:</strong> ${ScholarshipDetails.tutionFees}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Application Fees:</strong> {ScholarshipDetails.aplicationFees || 0}
                        </p>
                        <p className="text-gray-700 mb-4">
                            <strong>Deadline:</strong> {ScholarshipDetails.applicationDeadline}
                        </p>
                    </div>

                    {/* Payment Section */}
                    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete Your Payment</h2>
                        <p className="text-gray-700 mb-4">
                            You are about to pay in <strong>{ScholarshipDetails.scholarshipName}</strong>.
                        </p>
                        <p className="text-gray-700 mb-6">
                            <strong>Application Fees:</strong> ${ScholarshipDetails.aplicationFees}
                        </p>
                        <CheckoutForm
                            aplicationFees={ScholarshipDetails.aplicationFees}
                            scholarshipId={id}
                            userName={user?.displayName}
                            userEmail={user?.email}
                            postedUserEmail={ScholarshipDetails?.postedUserEmail}
                        />
                    </div>
                </div>
            </div>
        </Elements>
    );
};

export default Payment;