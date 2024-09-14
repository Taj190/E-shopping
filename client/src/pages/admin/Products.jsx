import React, { useEffect, useState } from 'react';
import Layout from '../../component/layout/layout';
import AdminMenu from '../../component/Layout/AdminMenu';
import axios from 'axios';
import Pagination from '../../component/pagination/Pagination';
import ProductEditModel from '../../assets/ProductModel.jsx/ProductEdit';
import { useAuth } from '../../component/context/auth';
import { toast } from 'react-toastify';
import DeleteProductModel from '../../assets/ProductModel.jsx/DeleteProductModel';


const Products = () => {
  const [auth] = useAuth();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);  
  const [productId, setProductId] = useState('');
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPrice, setEditPrice] = useState(0);
  const [editPhoto, setEditPhoto] = useState('');
  const [editQuantity, setEditQuantity] = useState(0);
  const [editShipping, setEditShipping] = useState(false);

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
      console.error("Fetch Products Error:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const handleEditClick = (product) => {
    setProductId(product._id);
    setEditName(product.name);
    setEditDescription(product.description);
    setEditPrice(product.price);
    setEditQuantity(product.quantity);
    setEditShipping(product.shipping);
    setEditPhoto('');
  };

  const handleEditProduct = async () => {
    if (!editName.trim() || !editDescription.trim() || editPrice <= 0) {
      alert("Please fill all required fields");
      return;
    }
    const formData = new FormData();
    formData.append('name', editName);
    formData.append('description', editDescription);
    formData.append('price', editPrice);
    formData.append('quantity', editQuantity);
    formData.append('shipping', editShipping);
    if (editPhoto) {
      formData.append('photo', editPhoto);
    }
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/product/update-product/${productId}`,
        formData ,
        {
          headers: {
             Authorization: ` ${auth?.token}`
           
          }
        }
      );

      if (data.success) {
        console.log(data)
        toast.success("Product Upadted Successfully");
        // Reset the form fields
        setEditName('');
        setEditDescription('');
        setEditPrice(0);
        setEditQuantity(0);
        setEditShipping(false);
        setEditPhoto('');

        fetchProducts();
      } else {
        alert("Failed to update product");
      }
    } catch (error) {
      console.error("Update Product Error:", error);
    }
  };
  const handleDeleteClick = (product)=>{
    setProductId(product._id);
  }
  const handleDeleteProduct = async()=>{
    try {
      const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/product/delete-product/${productId}`, {
        
        headers: {
          Authorization: ` ${auth?.token}`
        }
      });
      if (data.success) {
        toast.success("Product Deleted Successfully");
        setProductId('');
        fetchProducts();
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Delete Product Error:", error);
    }
  }

  return (
    <Layout title={"Products - All Products"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
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
                        <strong>Availability for shipping:</strong> {product.shipping ? 'Yes' : 'No'}
                      </p>
                      <div className="mt-auto">
                        <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                        <ProductEditModel
                          editName={editName}
                          editDescription={editDescription}
                          editPrice={editPrice}
                          editQuantity={editQuantity}
                          editShipping={editShipping}
                          handleEditClick={() => handleEditClick(product)}
                          handleEditProduct={handleEditProduct}
                          setEditName={setEditName}
                          setEditDescription={setEditDescription}
                          setEditPrice={setEditPrice}
                          setEditQuantity={setEditQuantity}
                          setEditShipping={setEditShipping}
                          editPhoto={editPhoto}
                          setEditPhoto={setEditPhoto}
                        />
                         < DeleteProductModel
                         handleDeleteClick={() => handleDeleteClick(product)}
                         handleDeleteProduct={handleDeleteProduct}
                         />
                      </div>
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
};

export default Products;

