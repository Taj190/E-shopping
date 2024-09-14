import React, { useState } from 'react'

const DeleteProductModel = ({handleDeleteClick , handleDeleteProduct}) => {
    const [showModel , setShowModel]= useState(false)
  return (
   <>
      <button className="btn btn-success mb-3" onClick={() => {
        handleDeleteClick()
        setShowModel(true)
    }}>
        Delete
    </button>
    {
        showModel&&  (
            <div className="modal show" style={{ display: 'block' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Are you Sure ?</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setShowModel(false)}
                            ></button>
                        </div>
                       
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowModel(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                    handleDeleteProduct()
                                    setShowModel(false); // Hide the modal after adding
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
   </>
  )
}

export default DeleteProductModel