import React, { Component, Fragment } from "react";
import { SearchHeader } from '../../components/SearchHeader';
import User from '../../components/User/User';
import axios from 'axios';
// import Modal from './Modal/Modal';
// import ModalFooter from './Modal/ModalFooter';
// import ModalBody from './Modal/ModalBody';
import { connect } from 'react-redux';
// import {hideModal, showModal} from '../actions/Login';
// import { LOGIN_MODAL } from '../constants/modalTypes';
// import ModalRootContainer from './Modal/ModalRootContainer';
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchBy: '',
            searchTerm: '',
            searchList: []
        }
    }
    handleSearchBy = (value) => {
        this.setState({ ...this.state, searchBy: value });
    }
    handleSearchTerm = (value) => {
        axios.get(`http://localhost:3002/users?userType=${this.state.searchBy}&q=${value}`).then((response) => {
            console.log('external service responded with', response);
            this.setState({ ...this.state, searchList: response.data })
        }).catch((error) => {
            console.log('error in external service', error);
        })
        this.setState({ ...this.state, searchTerm: value })
    }
    handleDelete = (id) => {
        //this.props.showModal(id);
        // axios.delete(`http://localhost:3000/users/${id}`).then((response) => {
        //     console.log('delete service called',  response);
        //     if(response.status === 200) {
        //         this.handleSearchTerm(this.state.searchTerm);
        //     }
        // }).catch((error) => {
        //     console.log('error in external service',  error);
        // })
    }
    closeModal = () => {
        this.setState({ showModal: false });
    }
    confirmModal = () => {
        console.log('confirm modal clicked');
        // axios.delete(`http://localhost:3000/users/${id}`).then((response) => {
        //     console.log('delete service called',  response);
        //     if(response.status === 200) {
        //         this.handleSearchTerm(this.state.searchTerm);
        //     }
        // }).catch((error) => {
        //     console.log('error in external service',  error);
        // })
        this.setState({ showModal: false });
    }
    render() {
        let result = this.state.searchList.map((user, index) => {
            return <User
                user={user}
                key={index}
                handleDelete={() => this.handleDelete(user.id)}
            />
        })
        return (
            <Fragment>
                {/*<Modal closeModal={this.closeModal} title="Delete User">
                    <ModalBody>
                        <p>Are you sure want to delete this user</p>
                    </ModalBody>
                    <ModalFooter closeTitle="Close" saveTitle="OK" closeModal={this.closeModal} confirmModal={this.confirmModal}/>
                </Modal>*/}
                {/* <ModalRootContainer /> */}
                <SearchHeader handleSearchBy={this.handleSearchBy} searchBy={this.state.searchBy} handleSearchTerm={this.handleSearchTerm} />
                {this.state.searchTerm.length >= 2 && this.state.searchList.length > 0 && result}
                {this.state.searchTerm.length >= 2 && this.state.searchList.length === 0 && (<div className="text-center"><p className="text-primary">No Records Found</p></div>)}
            </Fragment>
        )
    }
}
const mapDiapatchToProps = (dispatch) => ({
    // closeModal: () => dispatch(hideModal()),
    // showModal: (id) => dispatch(showModal(LOGIN_MODAL, id))
})
export default connect(null, mapDiapatchToProps)(Search);