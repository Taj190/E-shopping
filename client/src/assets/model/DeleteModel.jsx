import React, { useState } from 'react'

const DeleteModel = ({ handleDeletecategory , handleDeleteClick }) => {
    const [showDeleteModal , setShowDeleteModal] = useState(false)
  return (
    <>
    <button className="btn btn-success mb-3" onClick={() => {
        handleDeleteClick()
        setShowDeleteModal(true)
    }}>
        Delete
    </button>
    {showDeleteModal && (
        <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Are you Sure ?</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setShowDeleteModal(false)}
                        ></button>
                    </div>
                   
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setShowDeleteModal(false)}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                                handleDeletecategory() 
                                setShowDeleteModal(false); // Hide the modal after adding
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )}
</>
  )
}

export default DeleteModel