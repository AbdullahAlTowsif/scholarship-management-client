import { Link } from "react-router-dom";
import { FaSearch, FaUniversity, FaHandHoldingUsd } from "react-icons/fa";

const HomePage = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="hero bg-base-200 py-16 rounded-lg shadow-lg text-center">
        <div className="hero-content flex flex-col items-center">
          <h1 className="text-4xl font-bold text-primary">Welcome to Scholarship Management System</h1>
          <p className="text-lg text-gray-700 mt-4 max-w-2xl">
            A platform where students can search for suitable universities and scholarships, apply directly, and track their applications efficiently.
          </p>
          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <Link to="/scholarships" className="btn bg-[#890C25] text-white border-none flex items-center gap-2">
              <FaSearch /> Search Scholarships
            </Link>
            <Link to="/universities" className="btn bg-[#89890C] border-none text-white flex items-center gap-2">
              <FaUniversity /> Explore Universities
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <FaSearch className="text-5xl text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold">Find the Best Scholarships</h3>
          <p className="text-gray-600">Search and filter scholarships that match your academic background and financial needs.</p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <FaUniversity className="text-5xl text-secondary mx-auto mb-4" />
          <h3 className="text-xl font-semibold">Explore Top Universities</h3>
          <p className="text-gray-600">Browse universities and learn about admission requirements and available funding opportunities.</p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <FaHandHoldingUsd className="text-5xl text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold">Apply with Ease</h3>
          <p className="text-gray-600">Easily submit scholarship applications and track your progress in one place.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;