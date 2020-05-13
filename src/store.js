import { createStore, combineReducers } from "redux";
import modalReducer from "./reducers/modalReducer";

const reducer = combineReducers({
    modal: modalReducer
})


export const store = createStore(reducer);
