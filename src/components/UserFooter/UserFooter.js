import React from 'react';
class UserFooter extends React.Component {
    deleteClick = () => {
        this.props.deleteUser();
    }
    render() {
        return (
            <div className="card-footer">
                <div className="row">
                    <div className="col-3 text-muted">
                        <label>F&F: <strong>Completed</strong></label>
                    </div>
                    <div className="col-3 text-muted">
                        <label>Documents: <strong>{this.props.documentsStatus === 'Y' ? 'Submited' : 'Not Submited'}</strong></label>
                    </div>
                    <div className="col-3 text-muted">
                        <label>created-on: <strong>{this.props.date}</strong></label>
                    </div>
                    <div className="col-3">
                        <div className="row">
                            <div className="col-5">
                                <button className="btn btn-primary btn-block">Edit</button>
                            </div>
                            <div className="col-5">
                                <button className="btn btn-danger btn-block" onClick={this.deleteClick}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default UserFooter;