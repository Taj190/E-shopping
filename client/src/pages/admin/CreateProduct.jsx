import React, { useEffect, useState } from 'react'
import Layout from '../../component/layout/layout'
import AdminMenu from '../../component/Layout/AdminMenu'
import axios from 'axios';
import {Select} from 'antd'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../component/context/auth';
const {Option} = Select

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [auth] = useAuth();
  const categoryList = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/category/get-all-category`);
      if (data.success) {
        setCategories(data.data);
       
      } else {
        toast.error("Failed to get category list");
      }
    } catch (error) {
      toast.error("Failed to get category list");
    }
  };

  useEffect(() => {
    categoryList();
  }, []);
  const handleChange = (value) => {
    setCategory(value);
    
  };
   //create product function
   const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      if (photo) productData.append("photo", photo);
      productData.append("category", category);
      //for debuuging purpose
      // for (let [key, value] of productData.entries()) {
      //   console.log(key, value);
      // }
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/product/create-product`,
        productData,
        {
          headers: {
             Authorization: ` ${auth?.token}`
           
          }
        }
      );
      if (data?.success) {
        toast.success("Product Created Successfully");
      } 
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout title={"Create-Products "}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All Users</h1>
            <div className="m-1 w-75">
              <label htmlFor="category">Category:</label>
              <Select 
               showSearch
               placeholder="Select a category"
                style={{ width: '100%' }}
                onChange={handleChange}
              >
                {categories.map((item) => (
                  <Option key={item._id} value={item._id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
              <div className=" mt-3">
                <label className='btn btn-outline-secondary col-md-12' >
                {photo ? photo.name:'Upload image'}
                <input
                type='file'
                name ="photo"
                onChange={(e) => setPhoto(e.target.files[0])}
                accept='images/*'
                hidden
                
                />
                </label>
              </div>
              <div className='mt-3'>
               {
                photo && (
                  <div className = "text-center">
                    <img src={URL.createObjectURL(photo)} alt={photo.name} className='img img-responsive' style={{ width: '200px', height: 'auto' }}/>
                  </div>
                )
               }
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                 
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>


            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateProduct