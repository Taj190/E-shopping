import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaShopify } from "react-icons/fa";
import { useAuth } from '../context/auth';
import Cookies from 'js-cookie';
import SearchInput from '../Form/SearchInput';
import { UseCategory } from '../hooks/useCategory';
import { useCart } from '../context/cart';
import { Badge } from 'antd';
import './Header.css';

function Header() {
  const [auth, setAuth] = useAuth();
  const categories = UseCategory();
  const [cart] = useCart();

  const handleLogOut = () => {
    Cookies.remove('auth');
    setAuth({ user: null, token: "" });
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          
        </button>
        <h3 className='brand-name'>T-rendify</h3>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link to="/" className="navbar-brand">
            <FaShopify /> T-Rendify
          </Link>
          <div className="search-input-wrapper">
            <SearchInput className="search-input" /> {/* Centering search input */}
          </div>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" aria-current="page">Home</NavLink>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                Category
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to={`/categories`}>All Categories</Link></li>
                {categories.map((item) => (
                  <li key={item._id}>
                    <Link className="dropdown-item" to={`/category/${item.slug}`}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </li>
            {!auth.user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">SignUp</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">Login</NavLink>
                </li>
              </>
            ) : (
              <>
                <div className="dropdown">
                  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    {auth?.user?.name}
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><NavLink to={`${auth?.user?.role === 1 ? '/admin-dashboard/admin' : '/dashboard/user'}`} className="dropdown-item">Dashboard</NavLink></li>
                    <li><NavLink onClick={handleLogOut} to="/login" className="dropdown-item">Logout</NavLink></li>
                  </ul>
                </div>
              </>
            )}
            <li className="nav-item">
              <Badge count={cart.length} showZero>
                <NavLink to="/cart" className="nav-link">Cart</NavLink>
              </Badge>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
