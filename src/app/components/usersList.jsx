import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import SearchStatus from "./searchStatus";
import { paginate } from "../utils/paginate";
import api from "../../api";
import GroupList from "./groupList";
import UsersTable from "./usersTable";
import _ from "lodash";

const UsersList = () => {
  const pageSize = 8;
  const [activePage, setActivePage] = useState(1);
  const [professions, setProfessions] = useState();
  const [activeProf, setActiveProf] = useState();
  const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
  const [search, setSearch] = useState("");

  const [users, setUsers] = useState();
  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);
  const handleDelete = (id) => {
    setUsers(users.filter((user) => user._id !== id));
  };
  const handleToggleBookmark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark };
        }
        return user;
      })
    );
  };

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);
  useEffect(() => {
    setActivePage(1);
  }, [activeProf, search]);
  const handleSearch = ({ target }) => {
    setActiveProf(undefined);
    setSearch(target.value);
  };
  const handleActivePage = (id) => {
    setActivePage(id);
  };
  const handleActiveProf = (id) => {
    if (search !== "") setSearch("");
    setActiveProf(id);
  };
  const handleSort = (id) => {
    setSortBy(id);
  };
  if (users) {
    const filtedUsers = search
      ? users.filter(
          (user) => user.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
        )
      : activeProf
      ? users.filter(
          (user) =>
            JSON.stringify(user.profession) === JSON.stringify(activeProf)
        )
      : users;
    const usersLength = filtedUsers.length;
    const sortedUsers = _.orderBy(filtedUsers, [sortBy.iter], [sortBy.order]);
    const cropUsers = paginate(sortedUsers, pageSize, activePage);
    const clearFilter = () => {
      setActiveProf();
    };
    return (
      <div className="d-flex mt-5">
        {professions && (
          <div className="d-flex flex-column mt-5">
            <GroupList
              {...{
                items: professions,
                activeItem: activeProf,
                onItem: handleActiveProf
              }}
            />
            <button className="btn btn-info" onClick={clearFilter}>
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus length={usersLength} />
          <input
            {...{
              type: "text",
              name: "search",
              placeholder: "Search...",
              onChange: handleSearch,
              value: search
            }}
          />
          {usersLength > 0 && (
            <UsersTable
              {...{
                users: cropUsers,
                onSort: handleSort,
                sortBy,
                onDelete: handleDelete,
                onToggle: handleToggleBookmark
              }}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              {...{
                usersLength,
                pageSize,
                activePage,
                onPage: handleActivePage
              }}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <h2>
        <span className="badge bg-info">loading ...</span>
      </h2>
    );
  }
};

export default UsersList;
