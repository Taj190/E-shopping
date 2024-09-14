import React, { useEffect, useState } from 'react';
import Layout from '../component/layout/layout';
import { useAuth } from '../component/context/auth';
import axios from 'axios';
import Pagination from '../component/pagination/Pagination';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../component/price';
import { useCart } from '../component/context/cart';
import { toast } from 'react-toastify';
import shoeImage1 from '../assets/hiking-shoe.jpeg'; // Import the image
import shoeImage2 from '../assets/hiking-shoe-4.jpeg'; // Import the image
import shoeImage3 from '../assets/men-shoe.jpeg'; // Import the image
import './HomePage.css';
function HomePage() {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [radio, setRadio] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [cart , setCart]= useCart()
  const [animationFinished, setAnimationFinished] = useState(false);

  
  // Fetching categories
  const categoryList = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/category/get-all-category`
      );
      if (data.success) {
        setCategories(data.data);
      } else {
        toast.error('Failed to get category list');
      }
    } catch (error) {
      toast.error('Failed to get category list');
    }
  };

  // Fetching products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/product/read-product?page=${currentPage}`
      );
      if (data.success) {
        setProducts(data.data);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error('Fetch Products Error:', error);
    }
  };

  useEffect(() => {
    categoryList();
    fetchProducts(); // Fetch all products initially
  }, [currentPage]);

  // Function to handle category selection
  const handleFilter = (checked, id) => {
    let all = [...selectedCategories];
    if (checked) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setSelectedCategories(all);
  };

  // Fetch filtered products based on selected categories or price range
  const fetchFilteredProducts = async () => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/product/filter-products`, {
        categories: selectedCategories,
        priceRange: radio,
        page: currentPage,
      });
      if (data.success) {
      
        setProducts(data.data);
        setTotalPages(data.totalPages); 
      }
    } catch (error) {
      console.error('Failed to fetch filtered products', error);
    }
  };

  // Call fetchFilteredProducts when selected categories or radio changes
  useEffect(() => {
    if (selectedCategories.length > 0 || radio.length > 0) {
      fetchFilteredProducts();
    } else {
      fetchProducts(); // If no filters, fetch all products
    }
  }, [selectedCategories, radio]);
  const resetFilter = ()=>{
    setSelectedCategories([]);
    setRadio([]);
    fetchProducts();
  }
  // Trigger the animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationFinished(true);
    }, 1000); // Duration to wait before starting the rotation (in milliseconds)

    return () => clearTimeout(timer);
  }, []);
  return (
    <Layout
      title="Rendify - Sustainable Fashion for Everyone"
      description="Discover trendy and eco-friendly clothing at Rendify. Shop our sustainable fashion collection and join us on our mission to achieve zero emissions by 2030."
      Keywords={[
        'sustainable fashion',
        'eco-friendly clothing',
        'trendy clothes',
        'ethical fashion',
        'Rendify',
        'zero emissions',
        'online clothing store',
      ]}
    >
      <div className="hero-section">
      <div className="hero-content">
        <img src={shoeImage1} alt="Hero" className={`hero-image ${animationFinished ? 'hero-reveal' : ''}`} style={{ transform: 'rotateY(0deg) translateZ(300px)' }} />
        <img src={shoeImage2} alt="Hero" className={`hero-image ${animationFinished ? 'hero-reveal' : ''}`} style={{ transform: 'rotateY(120deg) translateZ(300px)' }} />
        <img src={shoeImage3} alt="Hero" className={`hero-image ${animationFinished ? 'hero-reveal' : ''}`} style={{ transform: 'rotateY(240deg) translateZ(300px)' }} />
        <div className="hero-text">
          Discover Your Next Adventure
        </div>
      </div>
    </div>

      <div className="container-fluid home m-3 p-3">
        <div className="row">
          {/* Filter Section */}
          <div className="col-md-2">
            <h3>Filter</h3>
            <div>
              {categories.map((category) => (
                <div key={category._id}>
                  <Checkbox
                    checked={selectedCategories.includes(category._id)}
                    onChange={(e) => handleFilter(e.target.checked, category._id)} // Correctly passing checked state and category ID
                  >
                    {category.name}
                  </Checkbox>
                </div>
              ))}
            </div>
             {/* Price filter */}
             <h4 className="text-center mt-4">Filter By Price</h4>
             <div className="d-flex flex-column">
               <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                 {Prices?.map((p) => (
                   <div key={p._id}>
                     <Radio value={p.array}>{p.name}</Radio>
                   </div>
                 ))}
               </Radio.Group>
               <button className="btn btn-dark" onClick={resetFilter}>Reset Filter</button>
             </div>
          </div>

          {/* Products Section */}
          <div className="col-md-10">

            <h1>All Products</h1>
            <div className="row">
              {products.map((product) => (
                <div className="col-md-4 mb-4" key={product._id}>
                  <div className="card h-100">
                    <img
                      src={`${import.meta.env.VITE_API_URL}/product/get-photo/${product._id}`}
                      className="card-img-top"
                      alt={product.name}
                      style={{ height: '300px', objectFit: 'cover' }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">
                        {product.description.substring(0, 100)}...
                      </p>
                      <p className="card-text">
                        <strong>Quantity:</strong> {product.quantity}
                      </p>
                      <p className="card-text">
                        <strong>Availability for shipping:</strong>{' '}
                        {product.shipping ? 'Yes' : 'No'}
                      </p>
                      <div className="mt-auto">
                        <p className="card-text">
                          <strong>Price:</strong> ${product.price}
                        </p>
                      </div>
                      <button className="btn btn-primary"
                      onClick={()=>{setCart([...cart ,product])
                        toast.success('Product added successfully')
                        localStorage.setItem('cart', JSON.stringify([...cart, product]))
                      }}>Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </Layout>
  );
}

export default HomePage;
