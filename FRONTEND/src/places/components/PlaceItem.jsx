import React, { useState, useContext } from "react";
import useHttpRequest from "../../shared/hooks/http-hook";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import Map from "../../shared/components/UIElements/Map";
import Modal from "../../shared/components/UIElements/Modal";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import "./PlaceItem.css";
import FmdGoodIcon from "@mui/icons-material/FmdGood";

function PlaceItem(props) {
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpRequest();

  function showDeleteWarningHandler() {
    setShowConfirmModal(true);
  }
  function cancelDeleteHandler() {
    setShowConfirmModal(false);
  }
  async function confirmDeleteHandler() {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/places/${props.id}`,
        "DELETE",
        { Authorization: "Bearer " + auth.token }
      );
      props.onDelete(props.id);
    } catch (err) {}
  }

  function openMapHandler() {
    setShowMap(true);
  }
  function closeMapHandler() {
    setShowMap(false);
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item-modal-content"
        footerClass="place-item-modal-actions"
        footer={<Button onClick={closeMapHandler}>Close</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>

      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item-modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              Cancel
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p>Do you want to proceed and delete this page?</p>
      </Modal>

      <Card>
        {isLoading && <LoadingSpinner asOverlay />}
        <img
          src={process.env.REACT_APP_ASSEST_URL + props.image}
          alt={props.title}
          className="w-full h-72 object-cover"
        />
        <div className="mx-4 my-6 font-card">
          <div className="text-primary hover:text-sky-700 cursor-pointer">
            <FmdGoodIcon style={{ fontSize: "1rem" }} />
            <h3
              inverse
              onClick={openMapHandler}
              className=" text-sm inline-block ml-1"
            >
              {props.address}
            </h3>
          </div>

          <h2 className=" font-extrabold">{props.title}</h2>
          <p className=" h-20 font-normal text-gray-500">{props.description}</p>
        </div>
        <div className=" flex gap-2 m-2">
          {auth.userId === props.creatorId && (
            <Button
              to={`/places/${props.id}`}
              inverse
              className="!py-1 !px-3 !text-sm"
            >
              EDIT
            </Button>
          )}
          {auth.userId === props.creatorId && (
            <Button
              danger
              onClick={showDeleteWarningHandler}
              className="!py-1 !px-3 !text-sm"
            >
              DELETE
            </Button>
          )}
        </div>
      </Card>
    </React.Fragment>
  );
}

export default PlaceItem;
