import React, { Component } from 'react';

class AddExpenses extends Component {
    constructor(props) {
        super(props);
        this.clearHandler = this.clearHandler.bind(this);
        this.saveHandler = this.saveHandler.bind(this);
    }
    clearHandler(event) {
        event.preventDefault();
    }
    saveHandler(event) {
        event.preventDefault();
    }
    render() {
        return (
            <div className="row">
                <div className="col-sm-9 col-sm-offset-3" style={{ marginBottom: '20px' }}>
                    <h1>Add Expense</h1>
                </div>
                <div className="col-sm-6 col-sm-offset-1">
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label
                                htmlFor="inputEmail3"
                                className="col-sm-4 control-label">
                                Expenses Category
                            </label>
                            <div className="col-sm-6">
                                <select className="form-control">
                                    <option value="1">Meals</option>
                                    <option value="2">Tea</option>
                                    <option value="3">Repair Works</option>
                                    <option value="4">Electricty</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="inputAmount"
                                className="col-sm-4 control-label">
                                Amount
                            </label>
                            <div className="col-sm-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputAmount"
                                    placeholder="Amount"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="inputDescription"
                                className="col-sm-4 control-label">
                                Description
                            </label>
                            <div className="col-sm-6">
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    id="inputDescription"
                                    placeholder="Description"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-4 col-sm-5">
                                <button className="btn btn-primary" onClick={this.saveHandler}>Save</button> &nbsp;
                                <button className="btn btn-danger" onClick={this.clearHandler}>Clear</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddExpenses;
