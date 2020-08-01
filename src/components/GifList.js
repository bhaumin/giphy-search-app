import React from 'react';
import Gif from './Gif';
import Pagination from 'react-js-pagination';
import 'bootstrap/dist/css/bootstrap.min.css';


export default (props) => {
  if (!(props.gifs && props.gifs.length > 0 && props.pagination)) {
    return null;
  }

  return (
    <div className="gif-list-container center">
      <div className="gif-list">
        {props.gifs.map(gif => 
          <Gif key={gif.id} {...gif} />
        )}
      </div>

      <div className="pagination-container">
        <Pagination
          itemClass="page-item"
          linkClass="page-link"
          activePage={props.activePage}
          itemsCountPerPage={props.pageSize}
          totalItemsCount={props.pagination.total_count}
          pageRangeDisplayed={props.pageRangeDisplayed}
          onChange={props.handlePageChange} />
      </div>
    </div>
  );
};
