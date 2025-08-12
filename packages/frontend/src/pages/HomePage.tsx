import { TreePine, Search, BookOpen, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    name: 'Interactive Tree View',
    description: 'Visualize your knowledge base as an interactive tree with advanced navigation.',
    icon: TreePine,
    href: '/tree',
    color: 'bg-green-500',
  },
  {
    name: 'Advanced Search',
    description: 'Find documents quickly with full-text search and smart filtering.',
    icon: Search,
    href: '/search',
    color: 'bg-blue-500',
  },
  {
    name: 'Smart Collections',
    description: 'Organize documents into collections with rules and automation.',
    icon: BookOpen,
    href: '/collections',
    color: 'bg-purple-500',
  },
  {
    name: 'Analytics Dashboard',
    description: 'Track usage patterns and optimize your knowledge management.',
    icon: BarChart3,
    href: '/analytics',
    color: 'bg-orange-500',
  },
];

export default function HomePage() {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-secondary-900 sm:text-6xl">
            Interactive Knowledge Tree
          </h1>
          <p className="mt-6 text-lg leading-8 text-secondary-600">
            An advanced web application for managing and exploring knowledge documents in RAG systems.
            Visualize document hierarchies, control context inclusion, and optimize LLM interactions.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {features.map((feature) => (
              <Link
                key={feature.name}
                to={feature.href}
                className="group relative rounded-2xl bg-white p-8 shadow-sm ring-1 ring-secondary-200 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${feature.color}`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold leading-7 text-secondary-900 group-hover:text-primary-600 transition-colors">
                      {feature.name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-secondary-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </dl>
        </div>

        <div className="mt-16 bg-primary-50 rounded-2xl p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-primary-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-primary-700 mb-6">
              Begin exploring your knowledge base with our interactive tree interface.
            </p>
            <Link
              to="/tree"
              className="btn-primary px-8 py-3 text-base"
            >
              Open Tree View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}