import React, { Component} from 'react'






class SearchBar extends Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <input className="SearchBar" type="text" placeholder="Search by keyword"
                onChange={this.props.updateFilterList}                              //when change, updates list
            />
        )
    }

}

export default SearchBar
