import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import ResultsPage from './pages/ResultsPage'
import PhotoPage from './pages/PhotoPage'

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <HomePage /> },
    { path: '/capture', element: <PhotoPage /> },
    { path: '/results/:itemName', element: <ResultsPage /> },
  ])
  return <RouterProvider router={router} />
}

export default App
