import React, { useState , useEffect } from 'react'
import Layout from '../component/layout/layout'
import { useCart } from '../component/context/cart'
import { useAuth } from '../component/context/auth';
import { Link, useNavigate } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import { toast } from 'react-toastify';
import './cartPage.css'
const CartPage = () => {
    const navigate = useNavigate()
    const[cart , setCart] = useCart() ;
    const[auth , setAuth]= useAuth()
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const address = auth?.user?.address;
    const login = auth?.token;

    const redirectToLogin = () => {
      navigate('/login', { state:  '/cart'  });
    };
     
  const  removeFromCart =(item) =>{
    let clearCard = cart.filter((i)=>i._id !== item._id)
    setCart(clearCard)
    localStorage.setItem('cart', JSON.stringify(clearCard));
  }
  const getToken = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/product/braintree/token`);
      
      setClientToken(data?.clientToken); // Use data.clientToken from the response
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getToken();
  }, [auth?.token]);
  
  
  
  //handle payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();

      const config = {
        headers: {
          Authorization: `${auth?.token}` // Add the token to the request header
        }
      };
  
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/product/braintree/payment`, {
        nonce,
        cart,
      },config );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      console.log(data)
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
   <Layout>
   <div className="container">
  <div className="row text-center">
    <h1>{`Hello ${auth?.token ? auth?.user?.name : "user"}`}</h1>
    <p>
      {cart.length >= 1 ? (
        auth?.token ? (
          `You have ${cart.length} item(s) in your cart`
        ) : (
          <>
            You need to <Link to="/login">login</Link> first to proceed with checkout.
          </>
        )
      ) : (
        `You have selected nothing. Why are you here to checkout?`
      )}
    </p>
  </div>

  <div className="row">
    <div className="col-md-9">
      <h2>Cart Items</h2>
      {cart.length > 0 ? (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <button className="remove-btn" onClick={() => removeFromCart(item)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="empty-cart-message">No items in the cart.</p>
      )}
    </div>

    <div className="col-md-3 checkout-section">
      <h3>Checkout</h3>
      {login ? (
        address ? (
          cart.length < 1 ? (
            <div>
              <p>No items selected in the cart.</p>
              <Link to="/">
                <button className="btn btn-primary">Home</button>
              </Link>
            </div>
          ) : (
            <div>
              <p>Address: {address}</p>
              <Link to="/dashboard/user/profile">Change Address</Link>
              <p>Total: ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}</p>
            </div>
          )
        ) : (
          <div>
            <p>No address available</p>
            <button className="btn btn-dark" onClick={redirectToLogin}>
              Go to Login
            </button>
          </div>
        )
      ) : (
        <div>
          You need to <Link to="/login">login</Link> first.
        </div>
      )}

      <div className="mt-2">
        {!clientToken || !auth?.token || !cart?.length ? (
          ""
        ) : (
          <>
            <DropIn
              options={{
                authorization: clientToken,
                paypal: {
                  flow: "vault",
                },
              }}
              onInstance={(instance) => setInstance(instance)}
            />

            <button
              className="btn btn-primary"
              onClick={handlePayment}
              disabled={loading || !instance || !auth?.user?.address}
            >
              {loading ? "Processing ...." : "Make Payment"}
            </button>
          </>
        )}
      </div>
    </div>
  </div>
</div>

   </Layout>
  )
}

export default CartPage