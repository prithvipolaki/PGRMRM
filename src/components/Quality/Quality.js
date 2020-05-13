import React, { Component } from "react";

import { Formik } from 'formik';

import * as yup from 'yup';
import axios from 'axios';


const initialState = {

    qualityName: '',

    price: ''

}



const qualitySchema = yup.object().shape({

    qualityName: yup.string().required('Quality Name is required').min(2, 'Quality Name should be atleast 2 characters'),

    price: yup.string().required('Price is required').matches(/^[0-9]{4}$/, 'Must be a number of 4 characters')

});



export default class extends Component {

    render() {

        return (

            <Formik

                initialValues={initialState}

                onSubmit={(value, actions) => {
                    axios.post('http://localhost:3002/qualities', {
                        qualityName: value.qualityName,
                        price: value.price,
                        id: ""
                    }).then(function (response) {
                        actions.resetForm(initialState);
                        actions.setSubmitting(false);
                        console.log(response);
                    }).catch(function (error) {
                        console.log(error);
                    });
                }}

                validationSchema={qualitySchema}

            >

                {({ values, handleChange, handleBlur, touched, dirty, isSubmitting, errors, handleSubmit }) => (

                    <form onSubmit={handleSubmit} className="mt-3">

                        <div className="row">

                            <div className="col-4 form-group">

                                <label htmlFor="qualityName">Quality Name</label>

                                <input

                                    type="text"

                                    className="form-control"

                                    id="qualityName"

                                    placeholder="Enter Quality Name"

                                    onChange={handleChange}

                                    onBlur={handleBlur}

                                    value={values.qualityName} />

                                {errors.qualityName && touched.qualityName ? (

                                    <small className="form-text text-danger">

                                        {errors.qualityName}

                                    </small>

                                ) : ('')}

                            </div>

                        </div>

                        <div className="row">

                            <div className="col-4 form-group">

                                <label htmlFor="Price">Price</label>

                                <input

                                    type="text"

                                    className="form-control"

                                    id="price"

                                    placeholder="Enter Price Value"

                                    onChange={handleChange}

                                    onBlur={handleBlur}

                                    value={values.price} />

                                {errors.price && touched.price ? (

                                    <small className="form-text text-danger">

                                        {errors.price}

                                    </small>

                                ) : ('')}

                            </div>

                        </div>

                        <button

                            type="submit"

                            className="btn btn-primary"

                            disabled={!dirty && !isSubmitting}>

                            Add Quality

                        </button>

                    </form>

                )}

            </Formik>

        )

    }

}

