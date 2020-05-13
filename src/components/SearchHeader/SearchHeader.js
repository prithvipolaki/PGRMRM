import React from 'react';

class SearchHeader extends React.Component {
    constructor(props) {
        super(props);
    }
    handleChange = (event) => {
        if (event.target.name === 'search' || event.target.name === 'search') {
            this.props.handleSearchBy(event.target.value);
        }
        if (event.target.name === 'searchTerm') {
            this.props.handleSearchTerm(event.target.value);
        }
    }
    render() {
        return (
            <div className="row">
                <div className="col-6 text-right">
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" id="farmerCheck" value="farmer" name="search" onChange={this.handleChange} />
                        <label className="form-check-label" htmlFor="farmerCheck">Farmer</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" id="agentCheck" value="agent" name="search" onChange={this.handleChange} />
                        <label className="form-check-label" htmlFor="agentCheck">Agent</label>
                    </div>
                </div>
                {(this.props.searchBy === 'agent' || this.props.searchBy === 'farmer') ? (<div className="col-4 offset-2">
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="search"
                            placeholder="Search"
                            name="searchTerm"
                            onChange={this.handleChange} />
                    </div>
                </div>) : null}
            </div>
        )
    }
}
export default SearchHeader;