import React, { useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import Map from "../../shared/components/UIElements/Map";
import Modal from "../../shared/components/UIElements/Modal";
import "./PlaceItem.css";

function PlaceItem(props) {
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  function showDeleteWarningHandler() {
    setShowConfirmModal(true);
  }
  function cancelDeleteHandler() {
    setShowConfirmModal(false);
  }
  function confirmDeleteHandler() {
    setShowConfirmModal(false);
    console.log("Deleting......");
  }

  function openMapHandler() {
    setShowMap(true);
  }
  function closeMapHandler() {
    setShowMap(false);
  }

  return (
    <React.Fragment>
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

      <li className="place-item">
        <Card className="place-item-content">
          <div className="place-item-image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item-info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item-actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            <Button to={`/places/${props.id}`}>EDIT</Button>
            <Button danger onClick={showDeleteWarningHandler}>
              DELETE
            </Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
}

export default PlaceItem;
