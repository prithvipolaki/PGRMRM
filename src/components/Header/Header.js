import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

const Header = ({ location }) => {
    const currentPath = location.pathname;
    return (
        <ul className="nav nav-tabs" style={{ marginTop: '40px' }}>
            <li role="presentation" className={classNames({ 'active': currentPath === '/' })}>
                <Link to="/">Home</Link>
            </li>
            <li role="presentation" className={classNames({ 'active': currentPath === '/products' })}>
                <Link to="/products">Products</Link>
            </li>
            <li role="presentation" className={classNames('dropdown', { 'active': currentPath == '/addexpenses' || currentPath == '/viewexpenses' })}>
                <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                    Expenses <span className="caret"></span>
                </a>
                <ul className='dropdown-menu'>
                    <li role="presentation" >
                        <Link to="/addexpenses">Add</Link>
                    </li>
                    <li role="presentation" >
                        <Link to="/viewexpenses">View</Link>
                    </li>
                </ul>
            </li>
        </ul>
    )
}

export default withRouter(Header);
