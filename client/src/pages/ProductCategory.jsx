import React, { useEffect, useState } from 'react';
import Layout from '../component/layout/layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../component/context/cart';
import { toast } from 'react-toastify';

export const ProductCategory = () => {
    const { slug } = useParams();
    const [products, setProducts] = useState([]); // renamed to plural since it's an array
    const [category, setCategory] = useState([]); 
    const [cart , setCart]= useCart()// assuming category is an object

    const getProductCategory = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/product/product-category/${slug}`);
            if (data.success) {
                console.log(data);
                setProducts(data.products); // this is an array
                setCategory(data.category); // this is an object
            } else {
                console.log("Failed to fetch products");
            }
        } catch (error) {
            console.error("Error fetching product category:", error);
        }
    };

    useEffect(() => {
        getProductCategory();
    }, [slug]);
  
    return (
        <Layout>
            <h2>Category: {category.length > 0 ? category[0].name : "No Category"}</h2>

            <div className="row container-fluid">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div className="col-md-4 mb-4" key={product._id}>
                            <div className="card">
                                <img
                                    src={`${import.meta.env.VITE_API_URL}/product/get-photo/${product._id}`}
                                    className="card-img-top"
                                    alt={product.name}
                                    style={{ height: '310px', objectFit: 'cover' }}
                                />
                                <div className="card-body">
                               
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">{product.description.substring(0, 150)}...</p>
                                    <p className="card-text">
                                        <strong>Price:</strong> ${product.price}
                                    </p>
                                    <button className="btn btn-primary"
                      onClick={()=>{setCart([...cart ,product])
                        toast.success('Product added successfully')
                        localStorage.setItem('cart', JSON.stringify([...cart, product]))
                      }}>Add to Cart</button>
                                </div>
                            </div>
                          
                        </div>
                    ))
                ) : (
                    <p>No products found for this category.</p>
                )}
            </div>
        </Layout>
    );
};
