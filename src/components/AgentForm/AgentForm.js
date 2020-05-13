import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import ModalRootContainer from "../../containers/Modal/ModalRootContainer";
import { connect } from "react-redux";
import { showModal } from "../../actions/modal";

const initialState = {
    agentFirstName: "",
    agentLastName: "",
    agentVillageName: ""
};

const userSchema = yup.object().shape({
    agentFirstName: yup.string().required('Agent First Name is required').min(3, 'Agent First Name should be atleast 3 characters').max(30, 'Agent First Name cannot be more than 30 characters'),
    agentLastName: yup.string().required('Agent Last Name is required').min(3, 'Agent Last Name should be atleast 3 characters').max(30, 'Agent Last Name cannot be more than 30 characters'),
    agentVillageName: yup.string().required('Agent Village Name is required').min(3, 'Agent Village Name should be atleast 3 characters').max(30, 'Agent Village Name cannot be more than 30 characters')
});

class AgentForm extends Component {
    render() {
        return (
            <div className="mt-5">
                <ModalRootContainer />
                <Formik
                    initialValues={initialState}
                    onSubmit={(value, actions) => {
                        // call axios here
                        var self = this;
                        axios.post('http://localhost:3002/agents', {
                            agentFirstName: value.agentFirstName,
                            agentLastName: value.agentLastName,
                            agentVillageName: value.agentVillageName,
                            id: ""
                        })
                            .then(function (response) {
                                actions.resetForm(initialState);
                                actions.setSubmitting(false);
                                self.props.showModal();
                                console.log(response);
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }}
                    validationSchema={userSchema}
                >
                    {({ handleSubmit, handleChange, values, touched, handleBlur, dirty, errors, isSubmitting }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-4 form-group">
                                    <label htmlFor="agentFirstName">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="agentFirstName"
                                        placeholder="Enter Agent First Name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.agentFirstName} />
                                    {errors.agentFirstName && touched.agentFirstName ? (
                                        <small id="passwordHelpBlock" className="form-text text-danger">
                                            {errors.agentFirstName}
                                        </small>
                                    ) : ('')}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4 form-group">
                                    <label htmlFor="agentLastName">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="agentLastName"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Enter Agent Last Name"
                                        value={values.agentLastName} />
                                    {errors.agentLastName && touched.agentLastName ? (
                                        <small id="passwordHelpBlock" className="form-text text-danger">
                                            {errors.agentLastName}
                                        </small>
                                    ) : ('')}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4 form-group">
                                    <label htmlFor="agentVillageName">Village Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="agentVillageName"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Enter Agent village Name"
                                        value={values.agentVillageName} />
                                    {errors.agentVillageName && touched.agentVillageName ? (
                                        <small id="passwordHelpBlock" className="form-text text-danger">
                                            {errors.agentVillageName}
                                        </small>
                                    ) : ('')}
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={!dirty && !isSubmitting}>
                                Submit
                        </button>
                        </form>
                    )}
                </Formik>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    showModal: () => dispatch(showModal("ADD_AGENT_MODAL"))
})

export default connect(null, mapDispatchToProps)(AgentForm);
