import { Search, Settings, HelpCircle } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export function Header() {
  const location = useLocation()

  return (
    <header className="h-16 border-b border-gray-200 bg-white px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-2xl font-bold text-primary-600">
          Knowledge Tree
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link
            to="/"
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              location.pathname === '/'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Tree View
          </Link>
          <Link
            to="/search"
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              location.pathname === '/search'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Search
          </Link>
          <Link
            to="/context"
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              location.pathname === '/context'
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Context
          </Link>
        </nav>
      </div>

      <div className="flex items-center space-x-3">
        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
          <Search className="h-5 w-5" />
        </button>
        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
          <Settings className="h-5 w-5" />
        </button>
        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
}