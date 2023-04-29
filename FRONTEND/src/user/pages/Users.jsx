import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import useHttpRequest from "../../shared/hooks/http-hook";

function Users() {
  const { isLoading, error, sendRequest, clearError } = useHttpRequest();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    async function getUsers() {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users"
        );

        setLoadedUsers(responseData.users);
      } catch (err) {
        console.log(err.message);
      }
    }
    getUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      <UsersList items={loadedUsers} />
    </React.Fragment>
  );
}

export default Users;
