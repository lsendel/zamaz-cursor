import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { TreeView } from './components/Tree/TreeView'
import { SearchView } from './components/Search/SearchView'
import { ContextView } from './components/Context/ContextView'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<TreeView />} />
        <Route path="/search" element={<SearchView />} />
        <Route path="/context" element={<ContextView />} />
      </Routes>
    </Layout>
  )
}

export default App