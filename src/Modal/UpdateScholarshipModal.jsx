import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { imageUpload } from "../api/utils";
import LoadingSpinner from "../components/common/LoadingSpinner";

const UpdateScholarshipModal = ({ scholarship, isOpen, onClose, refetch }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();

    // Prefill form when modal opens
    useState(() => {
        if (scholarship) {
            Object.keys(scholarship).forEach((key) => {
                setValue(key, scholarship[key]);
            });
        }
    }, [scholarship, setValue]);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            let updatedImage = scholarship.image;

            // Upload new image if selected
            if (data.universityImage && data.universityImage.length > 0) {
                const imageFile = data.universityImage[0];
                updatedImage = await imageUpload(imageFile);
            }

            const updatedData = { ...data, image: updatedImage };

            // Send update request
            await axiosSecure.put(`/scholarship/update/${scholarship._id}`, updatedData);

            // Trigger refetch to get the latest data
            await refetch();

            // Show success alert
            Swal.fire({
                title: "Success!",
                text: "Scholarship updated successfully!",
                icon: "success",
                confirmButtonText: "OK",
            });

            onClose(); // Close modal after update
        } catch (err) {
            console.error(err);
            toast.error("Update failed! Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-opacity-30 backdrop-blur-sm">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
                <h1 className="text-2xl font-bold text-center text-[#890C25] mb-4">Edit Scholarship</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="label">Scholarship Name</label>
                        <input {...register("scholarshipName", { required: true })} className="input input-bordered w-full" />
                        {errors.scholarshipName && <p className="text-red-500">Required</p>}
                    </div>
                    <div>
                        <label className="label">University Name</label>
                        <input {...register("universityName", { required: true })} className="input input-bordered w-full" />
                        {errors.universityName && <p className="text-red-500">Required</p>}
                    </div>
                    <div>
                        <label className="label">University Logo</label>
                        <input type="file" {...register("universityImage")} className="file-input file-input-bordered w-full" />
                        <img src={scholarship.image} alt="University Logo" className="w-20 h-20 mt-2 rounded-lg" />
                    </div>
                    <div>
                        <label className="label">Country</label>
                        <input {...register("universityCountry", { required: true })} className="input input-bordered w-full" />
                    </div>
                    <div>
                        <label className="label">City</label>
                        <input {...register("universityCity", { required: true })} className="input input-bordered w-full" />
                    </div>
                    <div>
                        <label className="label">Rank</label>
                        <input type="number" {...register("universityRank", { required: true })} className="input input-bordered w-full" />
                    </div>
                    <div>
                        <label className="label">Category</label>
                        <select {...register("scholarshipCategory")} className="select select-bordered w-full">
                            <option>Full Fund</option>
                            <option>Partial</option>
                            <option>Self-Fund</option>
                        </select>
                    </div>
                    <div>
                        <label className="label">Degree</label>
                        <select {...register("degree")} className="select select-bordered w-full">
                            <option>Diploma</option>
                            <option>Bachelor</option>
                            <option>Masters</option>
                        </select>
                    </div>
                    <div>
                        <label className="label">Tuition Fees</label>
                        <input type="number" {...register("tutionFees")} className="input input-bordered w-full" />
                    </div>
                    <div>
                        <label className="label">Application Fees</label>
                        <input type="number" {...register("aplicationFees", { required: true })} className="input input-bordered w-full" />
                    </div>
                    <div>
                        <label className="label">Service Charge</label>
                        <input type="number" {...register("serviceCharge", { required: true })} className="input input-bordered w-full" />
                    </div>
                    <div>
                        <label className="label">Application Deadline</label>
                        <input type="date" {...register("applicationDeadline", { required: true })} className="input input-bordered w-full" />
                    </div>
                    <div>
                        <label className="label">Post Date</label>
                        <input type="date" {...register("scholarshipPostDate", { required: true })} className="input input-bordered w-full" />
                    </div>
                    <div className="col-span-2 flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="btn btn-outline">Cancel</button>
                        <button type="submit" className="btn bg-[#890C25] text-white">
                            {loading ? <LoadingSpinner /> : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateScholarshipModal;
