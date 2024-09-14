import React, { useState } from 'react';

const ProductEditModel = ({
  editName, setEditName,
  editDescription, setEditDescription,
  editPrice, setEditPrice,
  editQuantity, setEditQuantity,
  editShipping, setEditShipping,
  editPhoto, setEditPhoto, // Handle photo state
  handleEditProduct, handleEditClick
}) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditPhoto(file); // Set the selected file to the state
    } else {
      setEditPhoto(''); // Reset if no file is selected
    }
  };

  return (
    <>
      <button className="btn btn-success mb-3" onClick={() => {
        handleEditClick();
        setShowEditModal(true); 
      }}>
        Edit
      </button>

      {showEditModal && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Product</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Product Name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <textarea
                  className="form-control mb-3"
                  placeholder="Product Description"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Product Price"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                />
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Product Quantity"
                  value={editQuantity}
                  onChange={(e) => setEditQuantity(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Shipping Availability"
                  value={editShipping ? 'Yes' : 'No'}
                  onChange={(e) => setEditShipping(e.target.value === 'Yes')}
                />
                <input
                  type="file"
                  className="form-control mb-3"
                  onChange={handleFileChange} // Handle photo input change
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
                    handleEditProduct();
                    setShowEditModal(false); // Hide modal after updating
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
  );
};

export default ProductEditModel;

