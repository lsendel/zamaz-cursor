import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import TreePage from './pages/TreePage';
import SearchPage from './pages/SearchPage';
import CollectionsPage from './pages/CollectionsPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';
import { TreeView } from './components/Tree/TreeView';
import { SearchView } from './components/Search/SearchView';
import { ContextView } from './components/Context/ContextView';

function App() {
  return (
    <div className="min-h-screen bg-secondary-50">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="tree" element={<TreeView />} />
          <Route path="search" element={<SearchView />} />
          <Route path="context" element={<ContextView />} />
          <Route path="collections" element={<CollectionsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            style: {
              background: '#10b981',
            },
          },
          error: {
            style: {
              background: '#ef4444',
            },
          },
        }}
      />
    </div>
  );
}

export default App;