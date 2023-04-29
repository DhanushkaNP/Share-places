import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";
import useHttpRequest from "../../shared/hooks/http-hook";
import React, { useEffect, useState } from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

function UserPlaces() {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpRequest();

  const userId = useParams().userId;
  useEffect(() => {
    async function getUserPlaces() {
      const url = process.env.REACT_APP_BACKEND_URL + `/places/user/${userId}`;
      try {
        const responseData = await sendRequest(url);
        setLoadedPlaces(responseData.places);
      } catch (err) {}
    }
    getUserPlaces();
  }, [sendRequest, userId]);

  function placeDeleteHandler(deletedPlaceId) {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler} />
      )}
    </React.Fragment>
  );
}

export default UserPlaces;
