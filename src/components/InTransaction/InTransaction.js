import React, { Component } from "react";
import axios from 'axios';
import { Formik } from "formik";
import * as yup from 'yup';
const initialState = {
    userType: '',
    firstName: '',
    lastName: '',
    villageName: '',
    quality: '',
    bags: '',
    quintals: '',
    price: '',
    totalPrice: '',
    date: '',
    documentsStatus: '',
    agentName: '',
    email: '',
    phone: '',
    billNo: '',
    vehicleNo: '',
    vehicleType: '',
    charges: ''
}
const farmerSchema = yup.object().shape({
    userType: yup.string().required('UserType is required'),
    firstName: yup.string().notRequired()
        .when('userType', {
            is: (val) => val === 'farmer',
            then: yup.string().required('First Name is required').min(2, 'First Name should be atleast 2 characters').max(50, 'First Name should not exceeds more than 50 characters'),
            otherwise: yup.string().notRequired()
        }),
    lastName: yup.string().notRequired()
        .when('userType', {
            is: (val) => val === 'farmer',
            then: yup.string().required('Last Name is required').min(2, 'Last Name should be atleast 2 characters').max(50, 'Last Name should not exceeds more than 50 characters'),
            otherwise: yup.string().notRequired()
        }),
    villageName: yup.string().notRequired()
        .when('userType', {
            is: (val) => val === 'farmer',
            then: yup.string().required('Village Name is required').min(2, 'village Name should be atleast 2 characters').max(50, 'Last Name should not exceeds more than 50 characters'),
            otherwise: yup.string().notRequired()
        }),
    agentName: yup.string().notRequired()
        .when('userType', {
            is: (val) => val === 'agent',
            then: yup.string().required('Agent Name is required'),
            otherwise: yup.string().notRequired()
        }),
    quality: yup.string().required('Quality is required'),
    email: yup.string().notRequired()
        .when('userType', {
            is: (val) => val === 'farmer',
            then: yup.string().required('Email is required').matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Enter valid email'),
            otherwise: yup.string().notRequired()
        }),
    phone: yup.string().notRequired()
        .when('userType', {
            is: (val) => val === 'farmer',
            then: yup.string().required('Phone number is required').matches(/^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/, 'Enter valid phone number'),
            otherwise: yup.string().notRequired()
        }),
    billNo: yup.string().required('Bill No is required')
        .min(2, 'Bill No should be atleast 2 characters').max(50, 'Bill No should not exceeds more than 50 characters'),
    documentsStatus: yup.string().required('Documents Provided is required'),
    date: yup.string().required('Date is required'),
    price: yup.string().required('Price is required')
        .matches(/^\d{1,4}(\.\d{0,2})?$/, 'Price must be less than 10000'),
    totalPrice: yup.string().required('Total Price is required')
        .min(3, 'Total Price should be atleast 3 numbers'),
    charges: yup.string().required('Loading and UnLoading charges is required')
        .min(1, 'Loading and UnLoading charges should be atleast 3 numbers'),
    bags: yup.string().required('Number of Bags is required'),
    quintals: yup.string().required('Number of Quintals is required'),
    vehicleNo: yup.string().required('Vehicle Number is required')
        .min(10, 'Vehicle Number should be atleast 10 characters'),
    vehicleType: yup.string().required('Vehicle Type is required')
        .min(2, 'Vehicle Type should be atleast 2 characters').max(50, 'Vehicle Type should not exceeds more than 50 characters'),

});
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            agentList: []
        }
    }
    componentDidMount() {
        axios.get(`http://localhost:3002/agents`)
            .then(response => {
                this.setState({ agentList: response.data });
            })
            .catch((error) => {
                console.log('error is', error)
            })
    }
    render() {
        let optionList = []
        if (this.state.agentList.length > 0) {
            optionList = this.state.agentList.map((agent, index) => {
                return <option value={agent.id}>{agent.agentFirstName + ' ' + agent.agentLastName}</option>
            })
        }
        return (
            <Formik
                initialValues={initialState}
                onSubmit={(value, actions) => {
                    const user = {};
                    console.log(value);
                    user.tbl_trns_user_type = value.userType;
                    user.tbl_trns_vehicle_no = value.vehicleNo;
                    user.tbl_trns_vehicle_type = value.vehicleType;
                    user.tbl_trns_no_of_bags = value.bags;
                    user.tbl_trns_no_of_quintals = value.quintals;
                    user.tbl_trns_price = value.price;
                    user.tbl_trns_date = value.date;
                    user.tbl_trns_docs = value.documentsStatus;
                    user.tbl_trns_quality = value.quality;
                    user.tbl_trns_bill_no = value.billNo;
                    user.tbl_trns_load_and_unload_charges = value.charges;
                    user.tbl_trns_total_amount = value.totalPrice;
                    user.tbl_trns_f_and_f = 'N';
                    if (value.userType === 'farmer') {
                        user.tbl_trns_first_name = value.firstName;
                        user.tbl_trns_last_name = value.lastName;
                        user.tbl_trns_village_name = value.villageName;
                        user.tbl_trns_phone = value.phone;
                        user.tbl_trns_email = value.email;
                    }
                    if (value.userType === 'agent') {
                        user.tbl_trns_agent_id = value.agentName;
                    }
                    axios.post('http://localhost:3001/api/transaction', user)
                        .then((response) => {
                            actions.resetForm(initialState);
                            actions.setSubmitting(false);
                            console.log('success', response);
                            alert('transaction created');
                        })
                        .catch((error) => {
                            console.log('fail', error);
                        })
                }}
                validationSchema={farmerSchema}
            >
                {({
                    handleSubmit,
                    handleBlur,
                    handleChange,
                    values,
                    errors,
                    isSubmitting,
                    dirty,
                    touched,
                    setFieldValue
                }) => (
                        <form onSubmit={handleSubmit} className="mt-5">
                            <div className="row">
                                <div className="col-12">
                                    <div className="col-12 form-group">
                                        <div className="row">
                                            <div className="col-3 offset-md-4">
                                                <label htmlFor="transaction">Transaction For</label>
                                            </div>
                                            <div className="col-5">
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="transactionByFarmer"
                                                        id="transactionByFarmer"
                                                        onBlur={handleBlur}
                                                        checked={values.userType === 'farmer'}
                                                        onChange={() => {
                                                            setFieldValue('userType', 'farmer');
                                                        }}
                                                        value="farmer" />
                                                    <label className="form-check-label" htmlFor="quantityInBags">Farmer</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="transactionByAgent"
                                                        id="transactionByAgent"
                                                        onChange={() => {
                                                            setFieldValue('userType', 'agent');
                                                        }}
                                                        onBlur={handleBlur}
                                                        checked={values.userType === 'agent'}
                                                        value="agent" />
                                                    <label className="form-check-label" htmlFor="quantityInQuintals">Agent</label>
                                                </div>
                                                {errors.userType && touched.userType ? (
                                                    <small className="form-text text-danger">
                                                        {errors.userType}
                                                    </small>
                                                ) : ('')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    {values.userType === 'farmer' ? (<div className="row">
                                        <div className="col-12 form-group">
                                            <label htmlFor="firstName">First Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="firstName"
                                                placeholder="Enter First Name"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.firstName}
                                            />
                                            {errors.firstName && touched.firstName ? (
                                                <small className="form-text text-danger">
                                                    {errors.firstName}
                                                </small>
                                            ) : ('')}
                                        </div>
                                    </div>) : ''}
                                    {values.userType === 'farmer' ? (<div className="row">
                                        <div className="col-12 form-group">
                                            <label htmlFor="lastName">Last Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="lastName"
                                                placeholder="Enter Last Name"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.lastName}
                                            />
                                            {errors.lastName && touched.lastName ? (
                                                <small className="form-text text-danger">
                                                    {errors.lastName}
                                                </small>
                                            ) : ('')}
                                        </div>
                                    </div>) : ''}
                                    {values.userType === 'farmer' ? (<div className="row">
                                        <div className="col-12 form-group">
                                            <label htmlFor="villageName">Village Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="villageName"
                                                placeholder="Enter Village Name"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.villageName} />
                                            {errors.villageName && touched.villageName ? (
                                                <small className="form-text text-danger">
                                                    {errors.villageName}
                                                </small>
                                            ) : ('')}
                                        </div>
                                    </div>) : ''}
                                    {values.userType === 'agent' ? (<div className="row">
                                        <div className="col-12 form-group">
                                            <label htmlFor="agentName">Agent Name</label>
                                            <select
                                                className="form-control"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.agentName}
                                                id="agentName"
                                                name="agentName">
                                                <option value="Select">Select</option>
                                                {optionList}
                                            </select>
                                            {errors.agentName && touched.agentName ? (
                                                <small className="form-text text-danger">
                                                    {errors.agentName}
                                                </small>
                                            ) : ('')}
                                        </div>
                                    </div>) : ''}
                                    {values.userType === 'farmer' ? (
                                        <div className="row">
                                            <div className="col-12 form-group">
                                                <label htmlFor="Phone">Phone</label>
                                                <input
                                                    className="form-control"
                                                    placeholder="Enter Phone"
                                                    id="phone"
                                                    value={values.phone}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur} />
                                                {errors.phone && touched.phone ? (
                                                    <small className="form-text text-danger">
                                                        {errors.phone}
                                                    </small>
                                                ) : ('')}
                                            </div>
                                        </div>
                                    ) : ''}
                                    {values.userType === 'farmer' ? (
                                        <div className="row">
                                            <div className="col-12 form-group">
                                                <label htmlFor="Email">Email</label>
                                                <input
                                                    className="form-control"
                                                    placeholder="Enter Email"
                                                    id="email"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur} />
                                                {errors.email && touched.email ? (
                                                    <small className="form-text text-danger">
                                                        {errors.email}
                                                    </small>
                                                ) : ('')}
                                            </div>
                                        </div>
                                    ) : ''}
                                </div>
                                <div className="col-4">
                                    <div className="row">
                                        <div className="col-12 form-group">
                                            <label htmlFor="quality">Quality</label>
                                            <select
                                                className="form-control"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.quality}
                                                id="quality">
                                                <option value="Select">Select</option>
                                                <option value="1">Samba</option>
                                                <option value="2">Swarna</option>
                                                <option value="3">1001</option>
                                            </select>
                                            {errors.quality && touched.quality ? (
                                                <small className="form-text text-danger">
                                                    {errors.quality}
                                                </small>
                                            ) : ('')}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 form-group">
                                            <label htmlFor="NoOfBags">Number of Bags</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="bags"
                                                name="bags"
                                                placeholder="Enter Number of Bags"
                                                value={values.bags}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.bags && touched.bags ? (
                                                <small className="form-text text-danger">
                                                    {errors.bags}
                                                </small>
                                            ) : ('')}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 form-group">
                                            <label htmlFor="NoOfQuintals">Number of Quintals</label>
                                            <input
                                                type="text"
                                                id='quintals'
                                                name='quintals'
                                                placeholder="Enter Number of Quintals"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                className="form-control"
                                                value={values.quintals}
                                            />
                                            {errors.quintals && touched.quintals ? (
                                                <small className="form-text text-danger">
                                                    {errors.quintals}
                                                </small>
                                            ) : ('')}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 form-group">
                                            <label htmlFor="price">Price</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="price"
                                                placeholder="Enter Price"
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
                                    <div className="row">
                                        <div className="col-12 form-group">
                                            <label htmlFor="charges">Loading and unloading charges</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="charges"
                                                placeholder="Enter loading and unloading charges"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.charges} />
                                            {errors.charges && touched.charges ? (
                                                <small className="form-text text-danger">
                                                    {errors.charges}
                                                </small>
                                            ) : ('')}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 form-group">
                                            <label htmlFor="totalPrice">Total Price</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="totalPrice"
                                                placeholder="Enter Total Price"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.totalPrice} />
                                            {errors.totalPrice && touched.totalPrice ? (
                                                <small className="form-text text-danger">
                                                    {errors.totalPrice}
                                                </small>
                                            ) : ('')}
                                        </div>
                                    </div>

                                </div>
                                <div className="col-4">
                                    <div className="row">
                                        <div className="col-12 form-group">
                                            <label htmlFor="billNo">Bill No</label>
                                            <input
                                                className="form-control"
                                                placeholder="Enter Bill No"
                                                id="billNo"
                                                value={values.billNo}
                                                onChange={handleChange}
                                                onBlur={handleBlur} />
                                            {errors.billNo && touched.billNo ? (
                                                <small className="form-text text-danger">
                                                    {errors.billNo}
                                                </small>
                                            ) : ('')}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 form-group">
                                            <label htmlFor="NoOfBags">Date</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="date"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.date} />
                                            {errors.date && touched.date ? (
                                                <small className="form-text text-danger">
                                                    {errors.date}
                                                </small>
                                            ) : ('')}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 form-group">
                                            <label htmlFor="vehicleNo">Vehicle Number</label>
                                            <input
                                                className="form-control"
                                                placeholder="Enter Vehicle Number"
                                                id="vehicleNo"
                                                value={values.vehicleNo}
                                                onChange={handleChange}
                                                onBlur={handleBlur} />
                                            {errors.vehicleNo && touched.vehicleNo ? (
                                                <small className="form-text text-danger">
                                                    {errors.vehicleNo}
                                                </small>
                                            ) : ('')}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 form-group">
                                            <label htmlFor="vehicleType">Vehicle Type</label>
                                            <input
                                                className="form-control"
                                                placeholder="Enter Vehicle Type"
                                                id="vehicleType"
                                                value={values.vehicleType}
                                                onChange={handleChange}
                                                onBlur={handleBlur} />
                                            {errors.vehicleType && touched.vehicleType ? (
                                                <small className="form-text text-danger">
                                                    {errors.vehicleType}
                                                </small>
                                            ) : ('')}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 form-group">
                                            <div className="row">
                                                <div className="col-12">
                                                    <label htmlFor="documentsOptionYes">Documents Provided</label>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="documentsOption"
                                                            id="documentsOptionYes"
                                                            onBlur={handleBlur}
                                                            checked={values.documentsStatus === '1'}
                                                            onChange={() => {
                                                                setFieldValue('documentsStatus', '1')
                                                            }}
                                                            value="1" />
                                                        <label className="form-check-label" htmlFor="documentsOptionYes">Yes</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="documentsOption"
                                                            id="documentsOptionNo"
                                                            onChange={() => {
                                                                setFieldValue('documentsStatus', '0')
                                                            }}
                                                            onBlur={handleBlur}
                                                            checked={values.documentsStatus === '0'}
                                                            value="0" />
                                                        <label className="form-check-label" htmlFor="documentsOptionNo">No</label>
                                                    </div>
                                                    {errors.documentsStatus && touched.documentsStatus ? (
                                                        <small className="form-text text-danger">
                                                            {errors.documentsStatus}
                                                        </small>
                                                    ) : ('')}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-10 text-right">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={!dirty && !isSubmitting}>
                                        Add Transaction
                             </button>
                                </div>
                            </div>
                        </form>
                    )}
            </Formik>
        )
    }
}
