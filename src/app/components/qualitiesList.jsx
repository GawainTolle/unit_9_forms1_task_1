import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";

const QualitiesList = ({ qual }) => {
  return (
    <>
      {qual.map((quality) => (
        <Quality key={quality._id} {...quality} />
      ))}
    </>
  );
};
QualitiesList.propTypes = {
  qual: PropTypes.array.isRequired
};

export default QualitiesList;
