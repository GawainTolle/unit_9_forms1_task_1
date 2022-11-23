import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = ({ usersLength, onPage, activePage, pageSize }) => {
  const totalPages = Math.ceil(usersLength / pageSize);
  if (totalPages === 1) return null;
  const pages = _.range(1, totalPages + 1);
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li key={page} className="page-item">
            <button
              className={"page-link" + (activePage === page ? " active" : "")}
              onClick={() => onPage(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
Pagination.propTypes = {
  usersLength: PropTypes.number.isRequired,
  onPage: PropTypes.func.isRequired,
  activePage: PropTypes.number,
  pageSize: PropTypes.number.isRequired
};

export default Pagination;
