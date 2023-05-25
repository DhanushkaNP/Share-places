import PlaceList from "./PlaceList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import useHttpRequest from "../../shared/hooks/http-hook";

import React, { useEffect, useState } from "react";

function Places(props) {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpRequest();

  useEffect(() => {
    async function getUserPlaces() {
      const url = process.env.REACT_APP_BACKEND_URL + props.link;
      try {
        const responseData = await sendRequest(url);
        setLoadedPlaces(responseData.places);
      } catch (err) {}
    }
    getUserPlaces();
  }, [props.link, sendRequest]);

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

export default Places;
