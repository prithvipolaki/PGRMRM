import React from 'react';
import UserHeader from '../UserHeader/UserHeader';
import UserFooter from '../UserFooter/UserFooter';
import UserBody from '../UserBody/UserBody';
class User extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style={{ marginBottom: '20px' }}>
                <div className="card" >
                    <div className="card-body">
                        <div className="card-text">
                            <table className="table">
                                <UserHeader />
                                <UserBody
                                    firstName={this.props.user.firstName}
                                    lastName={this.props.user.lastName}
                                    villageName={this.props.user.villageName}
                                    quality={this.props.user.quality}
                                    quantityIn={this.props.user.quantityIn}
                                    bags={this.props.user.bags}
                                    quintals={this.props.user.quintals}
                                    price={this.props.user.price} />
                            </table>
                        </div>
                    </div>
                    <UserFooter
                        date={this.props.user.date}
                        documentsStatus={this.props.user.documentsStatus}
                        deleteUser={this.props.handleDelete} />
                </div>
            </div>
        )
    }
}
export default User;