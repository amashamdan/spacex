import React, { Component } from "React";
import "./Controls.css";

export default class Controls extends Component {
    constructor(props) {
        super(props);
        this.changePaginationSize = this.changePaginationSize.bind(this);
        this.searchTextChange = this.searchTextChange.bind(this);
    }

    render() {
        return <div className="controls-div columns">
            <div className="column is-3">
                Click on a card to expand the launch's information
            </div>
            <div className="column is-6">
                <input type="text" value={this.props.searchValue} onChange={this.searchTextChange} pleaceholder="Filter for launch" />
            </div>
            <div className="column is-3">
                <span>Results per page: </span>
                {this.renderPaginationSizeMenu()}
            </div>
        </div>
    }

    searchTextChange(event) {
        this.props.updateSearchText(event.target.value);
    }

    renderPaginationSizeMenu() {
        const { paginationSize, paginationSizes } = this.props;

        const options = paginationSizes.map((size, index) => {
            return <option key={index} value={size}>{`${size} Results`}</option>
        })

        return <select value={paginationSize} onChange={this.changePaginationSize}>
            {options}
        </select>
    }

    changePaginationSize(event) {
        this.props.updatePaginationSize(event.target.value);
    }
}