import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../api";
import QualitiesList from "./qualitiesList";
import { useHistory } from "react-router-dom";

const UserPage = ({ id }) => {
  const [user, setUsers] = useState();
  const history = useHistory();
  useEffect(() => {
    api.users.getById(id).then((data) => setUsers(data));
  });
  const handleBtn = () => {
    history.push("/users");
  };
  if (user) {
    return (
      <div className="d-flex justify-content-center">
        <h2>
          <ul>Имя: {user.name}</ul>
          <ul>
            Качества: <QualitiesList qual={user.qualities} />
          </ul>
          <ul>Профессия: {user.profession.name}</ul>
          <ul>Встретился, раз: {user.completedMeetings}</ul>
          <ul>Оценка: {user.rate}/5</ul>
          <button className="btn btn-info" onClick={handleBtn}>
            Вернуться
          </button>
        </h2>
      </div>
    );
  } else {
    return (
      <h2>
        <span className="badge bg-info">loading...</span>
      </h2>
    );
  }
};
UserPage.propTypes = {
  id: PropTypes.string.isRequired
};

export default UserPage;
