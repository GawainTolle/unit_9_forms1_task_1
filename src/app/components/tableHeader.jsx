import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ sortBy, onSort, columns }) => {
  const handleSort = (id) => {
    if (sortBy.iter === id) {
      onSort({ ...sortBy, order: sortBy.order === "asc" ? "desc" : "asc" });
    } else {
      onSort({ iter: id, order: "asc" });
    }
  };
  const renderSortArrow = (sortBy, iter) => {
    if (sortBy.iter === iter) {
      if (sortBy.order === "asc") {
        return <i className={"bi bi-android"}></i>;
      } else {
        return <i className="bi bi-android2"></i>;
      }
    }
    return null;
  };
  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={
              columns[column].iter
                ? () => handleSort(columns[column].iter)
                : undefined
            }
            scope="col"
            {...{ role: columns[column].iter && "button" }}
          >
            {columns[column].name}{" "}
            {renderSortArrow(sortBy, columns[column].iter)}
          </th>
        ))}
      </tr>
    </thead>
  );
};
TableHeader.propTypes = {
  sortBy: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  columns: PropTypes.object.isRequired
};
export default TableHeader;
