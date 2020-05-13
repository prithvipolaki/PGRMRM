import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

const Header = ({ location }) => {
    const currentPath = location.pathname;
    return (
        <ul className="nav nav-tabs mt-5">
            <li role="presentation" className="nav-item link-wrapper" >
                {/* <a className="nav-link active" href="#">Agent</a> */}
                <NavLink to="/" exact={true} className="nav-link">Agent</NavLink>
            </li>
            <li role="presentation" className="nav-item link-wrapper" >
                {/* <a className="nav-link" href="#">Quality</a> */}
                <NavLink to="/quality" className="nav-link">Quality</NavLink>
            </li>
            <li role="presentation" className="nav-item link-wrapper" >
                {/* <a className="nav-link" href="#">Quality</a> */}
                <NavLink to="/intransaction" className="nav-link">InTransaction</NavLink>
            </li>
            <li role="presentation" className="nav-item link-wrapper" >
                {/* <a className="nav-link" href="#">Quality</a> */}
                <NavLink to="/search" className="nav-link">Search</NavLink>
            </li>
        </ul>
    )
}

// const Header = ({ location }) => {
//     const currentPath = location.pathname;
//     return (
//         <ul className="nav nav-tabs" style={{ marginTop: '40px' }}>
//             <li role="presentation" className={classNames({ 'active': currentPath === '/' })}>
//                 <Link to="/">Home</Link>
//             </li>
//             <li role="presentation" className={classNames({ 'active': currentPath === '/products' })}>
//                 <Link to="/products">Products</Link>
//             </li>
//             <li role="presentation" className={classNames('dropdown', { 'active': currentPath === '/addexpenses' || currentPath === '/viewexpenses' })}>
//                 <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
//                     Expenses <span className="caret"></span>
//                 </a>
//                 <ul className='dropdown-menu'>
//                     <li role="presentation" >
//                         <Link to="/addexpenses">Add</Link>
//                     </li>
//                     <li role="presentation" >
//                         <Link to="/viewexpenses">View</Link>
//                     </li>
//                 </ul>
//             </li>
//         </ul>
//     )
// }

export default withRouter(Header);
