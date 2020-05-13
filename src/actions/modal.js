import { HIDE_MODAL, SHOW_MODAL, LOGIN_MODAL } from '../constants/modalTypes';

export const hideModal = () => {
    return {
        type: HIDE_MODAL
    }
}

export const showModal = (modelType) => {
    return {
        type: SHOW_MODAL,
        modalType: modelType
    }
}
