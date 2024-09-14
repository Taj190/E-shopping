
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import { AuthProvider } from './component/context/auth.jsx'
import { SearchProvider } from './component/context/search.jsx'
import { CartProvider } from './component/context/cart.jsx'
createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <SearchProvider>
    <CartProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </CartProvider>
  </SearchProvider>
  </AuthProvider> // wrap the App component with BrowserRouter for routing support
  
)
