import React, { useState } from 'react'

const EditModel = ({editCategoryName, setEditCategoryName, handleEditCategory , handleEditClick}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  return (
   <>
     <button className="btn btn-success mb-3" onClick={() => {
         handleEditClick()
          setShowEditModal(true); 
        }}>
                Edit
            </button>
            {showEditModal && (
                <div className="modal show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                             
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowEditModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <h5 className="modal-title">Edit Category</h5>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Category Name"
                                    value={editCategoryName}
                                    onChange={(e) => setEditCategoryName(e.target.value)}
                                />
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowEditModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                        handleEditCategory();
                                        setShowEditModal(false); // Hide the modal after adding
                                    }}
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
   </>
  )
}

export default EditModel