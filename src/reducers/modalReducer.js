import { SHOW_MODAL, HIDE_MODAL } from "../constants/modalTypes"

const initialState = {
    modalType: null,
    modalProps: {}
}

const modalReducer = (state = initialState, action) => {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case SHOW_MODAL:
            newState.modalType = action.modalType;
            newState.modalProps = action.modalProps;
            break;
        case HIDE_MODAL:
            return initialState
        default:
            return state;
    }
    return newState;
};

export default modalReducer;
