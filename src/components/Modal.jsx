import React from 'react';

const Modal = ({show, onHide, onConfirm, children, onSubmit}) => {
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        onSubmit(); // Call the onSubmit function passed from the parent component
    };

    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div className="modal-content">
                <span className="close" onClick={onHide}>&times;</span>
                <form onSubmit={handleSubmit}> {/* Add form tag for onSubmit */}
                    <div className="modal-body">
                        {children}
                    </div>
                    <div className="modal-footer">
                        <button type="submit" onClick={(e) => {
                            e.preventDefault();
                            onConfirm();
                        }}>Ok
                        </button>
                        <button type="button" onClick={onHide}>Cancel</button>
                        {/* Change button type and remove form submission */}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Modal;
