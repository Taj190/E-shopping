import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Helmet } from "react-helmet";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Use default parameters in the function signature
function Layout({ children, title = 'Rendify - Trendy & Sustainable Fashion for Everyone', description = 'Discover Rendify, your go-to online store for trendy, sustainable clothing. Shop eco-friendly fashion for men, women, and kids with zero emissions by 2030.', keywords = [ 'sustainable fashion', 'eco-friendly clothing', 'trendy clothes', 'online clothing store', 'zero emissions fashion', 'affordable fashion', 'menswear', 'womenswear', 'kidswear', 'ethical fashion', 'organic cotton clothing', 'Rendify clothing', 'fashion for everyone', 'green fashion', 'sustainable brand', '2024 fashion trends' ] }) {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords.join(', ')} />
      </Helmet>
      <Header />
      <main style={{ minHeight: '73.8vh' }}>
        {children}
        <ToastContainer />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
