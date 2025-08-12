import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-full flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-secondary-200">404</h1>
        <h2 className="text-2xl font-semibold text-secondary-900 mt-4 mb-2">
          Page not found
        </h2>
        <p className="text-secondary-600 mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link
          to="/"
          className="btn-primary inline-flex items-center px-4 py-2"
        >
          <Home className="mr-2 h-4 w-4" />
          Go home
        </Link>
      </div>
    </div>
  );
}