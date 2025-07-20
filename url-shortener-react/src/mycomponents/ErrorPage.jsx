import { Link } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';
import { BiSad } from 'react-icons/bi';

const ErrorPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-800 via-blue-900 to-gray-900 text-white px-4">
      {/* Sad face icon */}
      <BiSad className="text-7xl text-white mb-4" />

      {/* Spinner */}
      <PuffLoader color="#ffffff" size={80} className="mb-6" />

      {/* Error Message */}
      <h1 className="text-3xl font-bold mb-2">Oops! Something went wrong.</h1>
      <p className="text-lg mb-6 text-gray-300 text-center max-w-md">
        We can't seem to find the page you're looking for or something broke. But don't worry, you're not lost forever.
      </p>

      {/* Actions */}
      <div className="flex gap-4">
        <Link
          to="/"
          className="rounded-full bg-blue-600 px-6 py-2 text-white font-semibold transition hover:bg-blue-700"
        >
          Go Home
        </Link>
        <button
          onClick={() => window.location.reload()}
          className="rounded-full border border-white px-6 py-2 text-white font-semibold transition hover:bg-white hover:text-blue-900"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
