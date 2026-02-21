import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { HomePage } from './pages/HomePage'
import { AdminPage } from './pages/AdminPage'

const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
