import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ id, onToggle, bookmark }) => {
  return (
    <button className="btn btn-info" onClick={() => onToggle(id)}>
      <i className={"bi bi-" + (bookmark ? "asterisk" : "at")}></i>
    </button>
  );
};
Bookmark.propTypes = {
  id: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
  bookmark: PropTypes.bool.isRequired
};

export default Bookmark;
