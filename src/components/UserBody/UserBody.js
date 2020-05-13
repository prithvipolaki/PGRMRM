import React from 'react';
class UserBody extends React.Component {
    render() {
        return (
            <tbody>
                <tr>
                    <td>{this.props.firstName}</td>
                    <td>{this.props.lastName}</td>
                    <td>{this.props.villageName}</td>
                    <td>{this.props.quality}</td>
                    <td>{this.props.quantityIn}</td>
                    <td>{this.props.bags}</td>
                    <td>{this.props.quintals}</td>
                    <td>{this.props.price}</td>
                </tr>
            </tbody>
        )
    }
}
export default UserBody;