import React from 'react';
import { connect } from 'react-redux';
import AddAgentModal from "../../components/AgentForm/AddAgentModal";

const ModalRootContainer = (props) => {
    if (!props.modal.modalType) {
        return null;
    }
    const MODAL_COMPONENTS = {
        ADD_AGENT_MODAL: AddAgentModal
    }
    const SpecificModal = MODAL_COMPONENTS[props.modal.modalType];
    return <SpecificModal />
}

const mapStateToProps = (state) => {
    return {
        modal: state.modal
    }
}

export default connect(mapStateToProps, null)(ModalRootContainer);