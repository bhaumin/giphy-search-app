import React, { Component } from 'react';
import { render } from 'react-dom';
import SearchBar from './components/SearchBar';
import GifList from './components/GifList';
import apiCalls from './apiCalls';
import './style.css';


class App extends Component {
  constructor() {
    super();

    this.state = {
      activeSearchTerm: '',
      activePage: 1,
      gifResults: null,
      pagination: null,
    };

    this.pageSize = 9;
    this.pageRangeDisplayed = 5;
  }

  componentDidMount() {
    // this.handleSearch(this.state.activeSearchTerm);
  }

  handleSearch = async (searchTerm) => {
    if (!searchTerm || searchTerm.trim() === '') {
      this.setState({
        gifResults: null
      });

      return;
    }

    let newActivePage = this.state.activePage;
    if (searchTerm !== this.state.activeSearchTerm) {
      newActivePage = 1;
    }

    try {
      const limit = this.pageSize;
      const offset = (newActivePage - 1) * this.pageSize;
      const results = await apiCalls.searchGifs(searchTerm, limit, offset);

      // this.logDebugInfo(searchTerm, results);

      this.setState({
        activeSearchTerm: searchTerm,
        activePage: newActivePage,
        gifResults: this.trimResults(results.data),
        pagination: results.pagination,
      });

    } catch(err) {
      console.error(err);
    }
  };

  logDebugInfo = (searchTerm, results) => {
    console.log(`Searching giphy api for "${searchTerm}"`);
    const start = results.pagination.offset + 1;
    const end = start + results.pagination.count - 1;
    const total_count = results.pagination.total_count;
    console.log(`Returned ${start} to ${end} of total ${total_count} results`);
    console.log(this.trimResults(results.data));
  };

  handlePageChange = (pageNumber) => {
    // console.log(`active page is ${pageNumber}`);
    this.setState({
      activePage: pageNumber
    }, () => {
      this.handleSearch(this.state.activeSearchTerm);
    });
  };

  trimResults = (results) => {
    return results.map(result => ({ 
      id: result.id,
      title: result.title,
      src: result.images.fixed_height.url,
    }));
  };

  render() {
    const { activeSearchTerm, activePage, gifResults, pagination } = this.state;
    return (
      <div className="container center">
        <SearchBar 
          initialSearchTerm={activeSearchTerm}
          handleSearch={this.handleSearch} />

        <GifList
          gifs={gifResults}
          pagination={pagination}
          activePage={activePage}
          pageSize={this.pageSize}
          pageRangeDisplayed={this.pageRangeDisplayed}
          handlePageChange={this.handlePageChange} />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
