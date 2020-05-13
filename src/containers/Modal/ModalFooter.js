import React from "react";

const ModalFooter = (props) => {
    return (
        <div className="modal-footer">
            <button
                type="button"
                className="btn btn-secondary"
                onClick={props.closeModal}>
                {props.closeTitle}
            </button>
            <button
                type="button"
                className="btn btn-primary"
                onClick={props.confirmModal}>
                {props.saveTitle}
            </button>
        </div>
    )
}

export default ModalFooter;