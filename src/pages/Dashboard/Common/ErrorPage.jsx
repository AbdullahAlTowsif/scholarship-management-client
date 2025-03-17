import { Link } from "react-router-dom";
import errorImage from "../../../assets/error-404-page.jpg";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <img src={errorImage} alt="Error" className="w-80 md:w-96 mb-6" />
      <h1 className="text-3xl font-bold text-red-500 mb-4">Oops! Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-6 text-center">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <Link to="/" className="btn btn-primary px-6 py-3 text-lg">
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;