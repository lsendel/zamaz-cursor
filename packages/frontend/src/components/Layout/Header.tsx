import { Search, User, Settings } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-secondary-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
            <input
              type="text"
              placeholder="Search documents..."
              className="input pl-10 w-full"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="btn-ghost p-2">
            <Settings className="h-5 w-5" />
          </button>
          <button className="btn-ghost p-2">
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}