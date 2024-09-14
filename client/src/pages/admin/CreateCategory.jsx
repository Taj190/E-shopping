import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Layout from '../../component/layout/layout';
import AdminMenu from '../../component/Layout/AdminMenu';
import ShowAddModal from '../../assets/model/showAddmodel';
import { useAuth } from '../../component/context/auth';
import EditModel from '../../assets/model/editModel';
import DeleteModel from '../../assets/model/deleteModel';

const CreateCategory = () => {
  const [category, setCategory] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editCategoryName , setEditCategoryName]= useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [DeleteCategoryId, setDeleteCategoryId] = useState(null);
  const [auth] = useAuth(); 
  const categoryList = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/category/get-all-category`);
      if (data.success) {
        setCategory(data.data);
       
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

  // Create category
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/category/create-category`, { name: newCategoryName },{
        headers: {
          Authorization: ` ${auth?.token}`
        }
      });
      if (data.success) {
        toast.success("Category added successfully");
        setNewCategoryName(''); // Clear the input field
        categoryList(); // Refresh the category list
      } else {
        toast.error("Failed to add category");
      }
    } catch (error) {
      toast.error("Failed to add category");
    }
  };
  const handleEditClick=(category)=>{
    setEditCategoryName(category.name);
    setEditCategoryId(category._id);
  }
  const handleEditCategory = async()=>{
    if (!editCategoryName.trim()) {
      toast.error("Category name cannot be empty");
      return;
      ///update-category
    }
    try {
      const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/category/update-category/${editCategoryId}`, { name: editCategoryName }, {
        headers: {
          Authorization: ` ${auth?.token}`
        }
      });
      if (data.success) {
        toast.success("Category updated successfully");
        setEditCategoryName('');
        setEditCategoryId(null);
        categoryList(); // Refresh the category list
      } else {
        toast.error("Failed to update category");
      }
    } catch (error) {
      toast.error("Failed to update category");
    }
    
  }
  const handleDeleteClick=(category)=>{
   
    setDeleteCategoryId(category._id);
  }
  const handleDeletecategory = async()=>{
    try {
      
      const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/category/delete-category/${DeleteCategoryId}`, {
        
        headers: {
          Authorization: ` ${auth?.token}`
        }
      });
      console.log(DeleteCategoryId, data);
      if (data.success) {
        toast.success("Category deleted successfully");
        setDeleteCategoryId(null);
        categoryList(); // Refresh the category list
      }

    } catch (error) {
      
      toast.error("Failed to delete category");
    }
  }
  console.log(category)
  return (
    <Layout title={"Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Category</h1>
            <ShowAddModal
              newCategoryName={newCategoryName}
              setNewCategoryName={setNewCategoryName}
              handleAddCategory={handleAddCategory}
            />
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {category.map((item) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td><EditModel
                      editCategoryName ={editCategoryName }
                      setEditCategoryName={setEditCategoryName}
                      handleEditCategory={handleEditCategory}
                      handleEditClick={() => handleEditClick(item)}
                      />
                      
                      </td>
                      <td><DeleteModel
                       handleDeletecategory={ handleDeletecategory } 
                       handleDeleteClick ={()=> handleDeleteClick(item)}
                      /></td>
                    </tr>
                  
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
