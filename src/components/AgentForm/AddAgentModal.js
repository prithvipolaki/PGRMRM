import React from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../../actions/modal';
import Modal from '../../containers/Modal/Modal';
import ModalBody from '../../containers/Modal/ModalBody';
import ModalFooter from '../../containers/Modal/ModalFooter';

class AddAgentModal extends React.Component {
    closeModal = () => {
        this.props.hideModal();
    }
    render() {
        return (
            <Modal closeModal={this.closeModal} title="Add Agent">
                <ModalBody>
                    <p>Agent added successfully</p>
                </ModalBody>
                <ModalFooter closeTitle="Close" saveTitle="OK" closeModal={this.closeModal} />
            </Modal>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    hideModal: () => dispatch(hideModal())
})

export default connect(null, mapDispatchToProps)(AddAgentModal);