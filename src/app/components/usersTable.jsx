import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Bookmark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";

const UsersTable = ({ users, onSort, sortBy, bookmark, onDelete, ...rest }) => {
  const columns = {
    name: {
      iter: "name",
      name: "Имя",
      component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>
    },
    qualities: {
      name: "Качества",
      component: (user) => (
        <QualitiesList key={user._id} qual={user.qualities} />
      )
    },
    professions: { iter: "profession.name", name: "Профессия" },
    completedMeetings: { iter: "completedMeetings", name: "Встретился, раз" },
    rate: { iter: "rate", name: "Оценка" },
    bookmark: {
      iter: "bookmark",
      name: "Избранное",
      component: (users) => (
        <Bookmark
          key={users._id}
          {...{ id: users._id, bookmark: users.bookmark }}
          {...rest}
        />
      )
    },
    delete: {
      component: (user) => (
        <button
          key={user._id}
          onClick={() => onDelete(user._id)}
          className="btn btn-danger"
        >
          Удалить
        </button>
      )
    }
  };
  return <Table {...{ onSort, sortBy, data: users, columns }} />;
};
UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  sortBy: PropTypes.object.isRequired,
  bookmark: PropTypes.bool,
  onDelete: PropTypes.func.isRequired
};

export default UsersTable;
