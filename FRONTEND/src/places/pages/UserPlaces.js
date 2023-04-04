import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";
import useHttpRequest from "../../shared/hooks/http-hook";
import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

function UserPlaces() {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpRequest();

  const userId = useParams().userId;
  useEffect(() => {
    async function getUserPlaces() {
      const url = `http://localhost:5000/api/places/user/${userId}`;
      console.log(url);
      try {
        const responseData = await sendRequest(url);
        setLoadedPlaces(responseData);
      } catch (err) {}
    }
    getUserPlaces();
  }, [sendRequest, userId]);

  console.log(loadedPlaces);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces.places} />}
    </React.Fragment>
  );
}

export default UserPlaces;
