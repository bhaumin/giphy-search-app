import React, { Component } from 'react';
import debounce from 'lodash.debounce';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.inputElem = React.createRef();

    this.state = {
      searchTerm: props.initialSearchTerm
    };
  }

  componentDidMount() {
    this.inputElem.current.focus();
  }

  debouncedHandleSearch = debounce(this.props.handleSearch, 500);

  handleChange = (event) => {
    this.setState({
      searchTerm: event.target.value
    }, () => {
      this.debouncedHandleSearch(this.state.searchTerm);
    });
  };

  render() {
    const { searchTerm } = this.state;

    return (
      <div className="search-bar center">
        <input
          type="text"
          ref={this.inputElem}
          value={searchTerm}
          onChange={this.handleChange}
          placeholder="Search Giphy" />
      </div>
    );
  }
}

export default SearchBar;
