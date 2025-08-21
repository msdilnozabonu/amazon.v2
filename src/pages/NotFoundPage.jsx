import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100 text-center px-4">
      <h1 className="text-7xl font-extrabold text-gray-800 mb-4">404</h1>
      <p className="text-2xl font-semibold text-gray-600 mb-2">Oops... Sorry!</p>
      <p className="text-lg text-gray-500 mb-6">
        The page you are looking for doesn’t exist.
      </p>
      
      <button
        onClick={() => navigate(-1)}
        className="mt-6 bg-yellow-400 rounded-md py-2 px-8 text-lg font-titleFont font-semibold cursor-pointer hover:bg-yellow-500 active:bg-yellow-700"
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFoundPage;
