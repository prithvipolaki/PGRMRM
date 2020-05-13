import React from 'react';

class Modal extends React.Component {
    componentDidMount() {
        if (this.props.closeModal) {
            window.addEventListener('keydown', this.listenKeyboard, true);
        }
    }

    componentWillUnmount() {
        if (this.props.closeModal) {
            window.removeEventListener('keydown', this.listenKeyboard, true)
        }
    }

    listenKeyboard = (event) => {
        if (event.keyCode === 23 || event.key === 'Escape') {
            this.props.closeModal();
        }
    }

    onOverLayClick = (event) => {
        this.props.closeModal();
    }

    onModalClick = (event) => {
        event.stopPropagation();
    }

    render() {
        return (
            <div className="modal" id="exampleModal" onClick={this.onOverLayClick}>
                <div className="modal-dialog" onClick={this.onModalClick}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{this.props.title}</h5>
                            <button type="button" className="close" onClick={this.props.closeModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;