import { NavLink } from 'react-router-dom';
import { Home, TreePine, Search, BookOpen, Settings, Brain } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Tree View', href: '/tree', icon: TreePine },
  { name: 'Search', href: '/search', icon: Search },
  { name: 'Context', href: '/context', icon: Brain },
  { name: 'Collections', href: '/collections', icon: BookOpen },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-r border-secondary-200 flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold text-primary-600">
          Knowledge Tree
        </h1>
        <p className="text-xs text-secondary-500 mt-1">
          Interactive RAG System
        </p>
      </div>
      
      <nav className="flex-1 px-4 pb-4">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
                  }`
                }
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}