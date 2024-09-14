import {Routes , Route} from "react-router-dom"
import ScrollToTop from "./pages/ScrollToTop.jsx"
import PageNotFound from "./pages/PageNotFound"
import HomePage from "./pages/HomePage"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Policy from "./pages/Policy"
import Register from "./pages/auth/Register.jsx"
import Login from "./pages/auth/Login.jsx"
import Dashboard from "./pages/user/Dashboard.jsx"
import PrivateRoute from "./component/Routes/Private.jsx"
import ForgotPassword from "./pages/auth/forgot.jsx"
import AdminRoute from "./component/Routes/adminRoute.jsx"
import AdminDashboard from "./pages/admin/Admin.jsx"
import CreateCategory from "./pages/admin/CreateCategory.jsx"
import CreateProduct from "./pages/admin/CreateProduct.jsx"
import Products from "./pages/admin/Products.jsx"
import UserProfile from "./pages/user/UserProfile.jsx"
import UserOrders from "./pages/user/UserOrders.jsx"
import Search from "./pages/Search.jsx"
import ProductDetails from "./pages/ProductDetails.jsx"
import Categories from "./pages/Categories.jsx"
import { ProductCategory } from "./pages/ProductCategory.jsx"
import CartPage from "./pages/cartPage.jsx"
import { AdminOrders } from "./pages/admin/AdminOrders.jsx"

// import UpdateProduct from "./pages/admin/UpdateProduct.jsx"


function App() {
  return (
 <>
  <ScrollToTop />
      <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/search" element={<Search />} />
    <Route path="/categories" element={<Categories  />} />
    <Route path="/cart" element={<CartPage  />} />
    <Route path="/category/:slug" element={<ProductCategory  />} />
    <Route path="/product/:slug" element={<ProductDetails />} />
    <Route path="/register" element={<Register/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/forgot-password" element={<ForgotPassword/>} />

    <Route path="/dashboard" element={<PrivateRoute/>} >
    <Route path="user" element={<Dashboard/>}/>
    <Route path="user/profile" element={<UserProfile/>}/>
    <Route path="user/orders" element={<UserOrders/>}/>
    </Route>

    <Route path="/admin-dashboard" element={<AdminRoute/>}>
     <Route path="admin" element={<AdminDashboard/>} />
     <Route path="admin/create-category" element={<CreateCategory/>} />
     <Route path="admin/create-product" element={<CreateProduct/>} />
     <Route path="admin/products" element={<Products/>} />
     <Route path="admin/orders" element={<AdminOrders />} />
     {/* <Route path="admin/update-product" element={<UpdateProduct/>} /> */}
    </Route>

    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/policy" element={<Policy />} />
    <Route path="*" element={<PageNotFound />} />
  </Routes>

 </>
  )
}

export default App
