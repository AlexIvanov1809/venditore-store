import * as React from "react";
import { userAPI } from "../services/user.service";

const UserContainer = () => {
  const { data: users, isLoading } = userAPI.useFetchAllUsersQuery(10);
  return (
    <div>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        users && users.map((u) => <div key={u.id}>{u.name}</div>)
      )}
    </div>
  );
};

export default UserContainer;
