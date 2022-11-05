import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <div>Route not found</div>
      <div className="flex items-center gap-6">
        <Link to="/" className="font-medium text-gray-600 hover:text-gray-900">
          Go to home page
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
