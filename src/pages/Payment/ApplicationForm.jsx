import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const ApplicationForm = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const scholarshipId = params.get("scholarshipId");
    console.log(scholarshipId);

    const { register, handleSubmit, formState: { errors } } = useForm();

    // ✅ Fetch scholarship details
    const { data: scholarship, isLoading, isError } = useQuery({
        queryKey: ["scholarship", scholarshipId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/scholarship/${scholarshipId}`);
            return res.data;
        },
        enabled: !!scholarshipId // Only fetch if scholarshipId exists
    });

    // ✅ Mutation for submitting the form
    const mutation = useMutation({
        mutationFn: async (formData) => {
            const res = await axiosSecure.post("/applied-scholarship", formData);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Scholarship application submitted successfully!");
            queryClient.invalidateQueries(["appliedScholarships"]); // Refetch applied scholarships
            navigate("/"); // Redirect after submission
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Submission failed!");
        },
    });

    const onSubmit = (data) => {
        const appliedScholarshipData = {
            ...data,
            userName: user?.displayName,
            userId: user?.uid,
            userEmail: user?.email,
            scholarshipId,
            appliedDate: new Date().toISOString(),
            universityName: scholarship?.universityName,
            scholarshipCategory: scholarship?.scholarshipCategory,
            subjectCategory: scholarship?.subjectCategory,
        };

        mutation.mutate(appliedScholarshipData);
    };

    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    if (isError) return <p className="text-red-500 text-center">Failed to load scholarship details.</p>;

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-semibold text-center mb-4">Scholarship Application Form</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Phone Number */}
                <input {...register("phone", { required: "Phone number is required" })}
                    type="text" placeholder="Phone Number" className="input input-bordered w-full" />
                {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

                {/* Photo */}
                <input {...register("photo", { required: "Photo URL is required" })}
                    type="text" placeholder="Photo URL" className="input input-bordered w-full" />
                {errors.photo && <p className="text-red-500">{errors.photo.message}</p>}

                {/* Address */}
                <input {...register("address.village", { required: "Village is required" })}
                    type="text" placeholder="Village" className="input input-bordered w-full" />
                <input {...register("address.district", { required: "District is required" })}
                    type="text" placeholder="District" className="input input-bordered w-full" />
                <input {...register("address.country", { required: "Country is required" })}
                    type="text" placeholder="Country" className="input input-bordered w-full" />

                {/* Gender */}
                <select {...register("gender", { required: "Gender is required" })}
                    className="input input-bordered w-full">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}

                {/* Degree */}
                <select {...register("degree", { required: "Degree is required" })}
                    className="input input-bordered w-full">
                    <option value="">Select Degree</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Masters">Masters</option>
                </select>
                {errors.degree && <p className="text-red-500">{errors.degree.message}</p>}

                {/* SSC & HSC Results */}
                <input {...register("sscResult", { required: "SSC result is required" })}
                    type="text" placeholder="SSC Result" className="input input-bordered w-full" />
                {errors.sscResult && <p className="text-red-500">{errors.sscResult.message}</p>}

                <input {...register("hscResult", { required: "HSC result is required" })}
                    type="text" placeholder="HSC Result" className="input input-bordered w-full" />
                {errors.hscResult && <p className="text-red-500">{errors.hscResult.message}</p>}

                {/* Study Gap */}
                <select {...register("studyGap")} className="input input-bordered w-full">
                    <option value="">Select Study Gap (if any)</option>
                    <option value="1 year">1 Year</option>
                    <option value="2 years">2 Years</option>
                    <option value="3 years">3 Years</option>
                    <option value="None">None</option>
                </select>

                {/* Read-Only Fields */}
                <input type="text" value={scholarship?.universityName || ""} className="input input-bordered w-full bg-gray-200" readOnly />
                <input type="text" value={scholarship?.scholarshipCategory || ""} className="input input-bordered w-full bg-gray-200" readOnly />
                <input type="text" value={scholarship?.subjectCategory || ""} className="input input-bordered w-full bg-gray-200" readOnly />

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-full" disabled={mutation.isLoading}>
                    {mutation.isLoading ? "Applying..." : "Apply for Scholarship"}
                </button>
            </form>
        </div>
    );
};

export default ApplicationForm;
