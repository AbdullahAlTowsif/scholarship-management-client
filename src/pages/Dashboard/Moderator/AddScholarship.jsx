import { useForm } from "react-hook-form";
import { FaUpload } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";

const AddScholarship = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { user } = useAuth();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-[#890C25] mb-6">Add Scholarship</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-lg rounded-lg p-6">
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="label">Scholarship Name</label>
            <input {...register("scholarshipName", { required: true })} className="input input-bordered w-full" />
            {errors.scholarshipName && <p className="text-red-500">This field is required</p>}
          </div>
          <div>
            <label className="label">University Name</label>
            <input {...register("universityName", { required: true })} className="input input-bordered w-full" />
            {errors.universityName && <p className="text-red-500">This field is required</p>}
          </div>
          <div>
            <label className="label">University Image/Logo</label>
            <div className="flex items-center gap-2">
              <input type="file" {...register("universityImage", { required: true })} className="file-input file-input-bordered w-full" />
              <FaUpload className="text-2xl text-primary" />
            </div>
            {errors.universityImage && <p className="text-red-500">This field is required</p>}
          </div>
          <div>
            <label className="label">University Country</label>
            <input {...register("universityCountry", { required: true })} className="input input-bordered w-full" />
          </div>
          <div>
            <label className="label">University City</label>
            <input {...register("universityCity", { required: true })} className="input input-bordered w-full" />
          </div>
          <div>
            <label className="label">University World Rank</label>
            <input type="number" {...register("universityRank", { required: true })} className="input input-bordered w-full" />
          </div>
          <div>
            <label className="label">Subject Category</label>
            <select {...register("subjectCategory")} className="select select-bordered w-full">
              <option>Agriculture</option>
              <option>Engineering</option>
              <option>Doctor</option>
            </select>
          </div>
          <div>
            <label className="label">Scholarship Category</label>
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
            <label className="label">Tuition Fees (Optional)</label>
            <input type="number" {...register("tuitionFees")} className="input input-bordered w-full" />
          </div>
          <div>
            <label className="label">Application Fees</label>
            <input type="number" {...register("applicationFees", { required: true })} className="input input-bordered w-full" />
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
            <label className="label">Scholarship Post Date</label>
            <input type="date" {...register("postDate", { required: true })} className="input input-bordered w-full" />
          </div>
          <div>
            <label className="label">Posted User Email</label>
            <input type="email" {...register("postedEmail", { required: true })} value={user?.email} readOnly className="input input-bordered w-full" />
          </div>
        </div>
        
        <button type="submit" className="btn bg-[#890C25] text-white mt-6 w-full">Submit Scholarship</button>
      </form>
    </div>
  );
};

export default AddScholarship;
