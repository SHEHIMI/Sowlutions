import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-lg text-slate-400">Page not found</p>
      <Link
        to="/"
        className="mt-8 rounded-lg bg-purple-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-purple-700"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
