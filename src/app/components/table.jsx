import React from "react";
import PropTypes from "prop-types";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const Table = ({ sortBy, onSort, columns, data, children }) => {
  return (
    <table className="table table-info table-striped-columns">
      {children || (
        <>
          <TableHeader {...{ sortBy, onSort, columns }} />
          <TableBody {...{ data, columns }} />
        </>
      )}
    </table>
  );
};
Table.propTypes = {
  sortBy: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  columns: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  children: PropTypes.array
};

export default Table;
