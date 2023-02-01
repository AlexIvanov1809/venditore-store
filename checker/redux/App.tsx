import React, { useEffect } from "react";
import PostContainer from "./components/PostContainer";
import UserContainer from "./components/UserContainer";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { fetchUsers } from "./store/reducers/ActionCreator";

function App() {
  // const dispatch = useAppDispatch();
  // const { users, error, isLoading } = useAppSelector(
  //   (state) => state.userReducer
  // );
  // useEffect(() => {
  //   dispatch(fetchUsers());
  // }, []);

  // if (isLoading) {
  //   return (
  //     <>
  //       <h2>Loading</h2>
  //     </>
  //   );
  // }
  // if (error) {
  //   return (
  //     <>
  //       <h2>{error}</h2>
  //     </>
  //   );
  // }

  return (
    <div>
      <UserContainer />
      <PostContainer />
    </div>
  );
}

export default App;
