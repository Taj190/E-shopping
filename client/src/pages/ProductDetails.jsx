import React, { useEffect, useState } from 'react'
import Layout from '../component/layout/layout'
import { useParams } from 'react-router-dom';
import axios from 'axios';
const ProductDetails = () => {
    const { slug} = useParams();
    const [product , setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    useEffect(()=>{
        if(slug)getProduct();
       
    },[slug])
    
    const getProduct = async()=>{
        try {
            const {data}= await axios.get(`${import.meta.env.VITE_API_URL}/product/read-single-product/${slug}`);
            if(data.success) setProduct(data.data);
            console.log(product,data)
            getSimilarProduct(data.data._id, data.data.category._id);
            
        } catch (error) {
            
        }
    }

    const getSimilarProduct = async (pid, cid) => {
        try {
          const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/product/similar-product/${pid}/${cid}`
          );
       
          setRelatedProducts(data.data);
        } catch (error) {
          console.log(error);
        }
      };
      console.log(relatedProducts)
   
  return (
    <Layout>
    <h1>Product Details</h1>
    <div className="row">
        <div className="col-md-6">
        <img
                      src={`${import.meta.env.VITE_API_URL}/product/get-photo/${product._id}`}
                      className="card-img-top"
                      alt={product.name}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
        </div>
        <div className="col-md-6">
        <div className="card-body d-flex flex-column">
        {/* <h3 className="card-title">Category: {product.category.name}</h3> */}
                      <h5 className="card-title">Name: {product.name}</h5>
                      
                      {/* <p className="card-text">Description:
                         {product.description.substring(0, 100)}
                      </p> */}
                      <p className="card-text">
                        <strong>Quantity:</strong> {product.quantity}
                      </p>
                      <p className="card-text">
                        <strong>Availability for shipping:</strong> {product.shipping ? 'Yes' : 'No'}
                      </p>
                      <div className="mt-auto">
                        <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                        </div>
                        <button className="btn btn-primary">Add To Cart</button>
                        </div>
                  </div>
             </div>
             <div className="row container similar-products">
        <h4>Similar Products ➡️</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((product) => (
            <div className="card m-2" key={product._id}>
              <img
                src={`${import.meta.env.VITE_API_URL}/product/get-photo/${product._id}`}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{product.name}</h5>
                  <h5 className="card-title card-price">
                    {product.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                </div>
                <p className="card-text ">
                  {product.description.substring(0, 60)}...
                </p>
                <div className="card-name-price">
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${product.slug}`)}
                  >
                    More Details
                  </button>
                  {/* <button
                  className="btn btn-dark ms-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, p])
                    );
                    toast.success("Item Added to cart");
                  }}
                >
                  ADD TO CART
                </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      

    </div>
    
    </Layout>
  )
}

export default ProductDetails