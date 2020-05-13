import React from 'react';
function UserHeader() {
    return (
        <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th style={{ width: '20%' }}>Village Name</th>
                <th>Quality</th>
                <th>quantityIn</th>
                <th style={{ width: '10%' }}>Quantity in Bags</th>
                <th style={{ width: '10%' }}>Quantity in Quintals</th>
                <th>Price</th>
            </tr>
        </thead>
    )
}
export default UserHeader;