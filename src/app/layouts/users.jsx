import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/userPage";
import UsersList from "../components/usersList";

const Users = () => {
  const params = useParams();
  const { userLol } = params;
  return <>{userLol ? <UserPage id={userLol} /> : <UsersList />}</>;
};

export default Users;
