import React from "react";
import styles from "./createEdit.module.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  indexCard_create_async,
  indexCard_GetById,
  indexCard_update_async,
  indexCard_Delete
} from "./server";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6

class CreateEdit extends React.Component {
  state = {
    id: "",
    front: "",
    back: "",
    cardStatus: "notpassed",
    sortOrder: 0,
    dateCreated: "",
    dateModified: "",
    modal: false,
    validate: "",
    color: "",
    body: ""
  };

  componentDidMount = () => {
    if (this.props.match.params.id) {
      const id = this.props.match.params.id;
      this.setState({ id }, () => {
        this.loadEditCard(id);
      });
    }
  };

  async loadEditCard() {
    const id = this.state.id;
    const resp = await indexCard_GetById(id);
    this.setState({
      id: resp.id,
      front: resp.front,
      back: resp.back,
      cardStatus: resp.cardStatus,
      sortOrder: resp.sortOrder,
      dateCreated: resp.dateCreated,
      dateModified: resp.dateModified
    });
  }

  handleClose = () => {
    this.props.history.push("/");
  };

  handleOnSubmit = () => {
    const regexString = /\S/;
    if (regexString.test(this.state.front)) {
      if (this.state.id) {
        this.onUpdateCurrentCard();
      } else {
        this.onCreateNewCard();
      }
    } else {
      NotificationManager.warning("Card Front cannot be blank");
    }
  };

  async onUpdateCurrentCard() {
    const { id, front, back, cardStatus, sortOrder } = this.state;
    const req = { id, front, back, cardStatus, sortOrder };
    const cardId = this.state.id;
    const resp = await indexCard_update_async(cardId, req);
    if (resp.status >= 200 && resp.status <= 299) {
      NotificationManager.success("Card Successfully Updated");
    } else {
      NotificationManager.error("Database Insert Error");
    }
  }

  async onCreateNewCard() {
    const { front, back, cardStatus, sortOrder } = this.state;
    const req = { front, back, cardStatus, sortOrder };
    const resp = await indexCard_create_async(req);
    if (resp.status >= 200 && resp.status <= 299) {
      NotificationManager.success("Card Successfully Created");
      this.setState({ front: "", back: "" });
    } else {
      NotificationManager.error("Database Insert Error");
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleConfirmModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  confirm = () => {
    this.toggleConfirmModal();
    this.DeleteCard(this.state.id);
  };

  async DeleteCard(id) {
    if (this.state.id !== -1) {
      const resp = await indexCard_Delete(id);
      if (resp.status >= 200 && resp.status <= 299) {
        NotificationManager.success("Card Successfully Deleted");
      } else {
        NotificationManager.error("Database Insert Error");
      }
      this.handleClose();
    }
  }

  handleFrontChange = e => {
    console.log(e);
    this.setState({ front: e });
  };

  handleBackChange = e => {
    console.log(e);
    this.setState({ back: e });
  };

  render() {
    const { id, front, back } = this.state;
    return (
      <>
        <Modal isOpen={this.state.modal} toggle={this.toggleConfirmModal}>
          <ModalHeader toggle={this.toggleConfirmModal}>
            &nbsp; DELETE
          </ModalHeader>
          <ModalBody>
            <span className={styles.confirmModalText}>
              Are you sure you want to delete this card?
            </span>
          </ModalBody>
          <ModalFooter>
            <Button color="danger m-0" onClick={this.confirm}>
              Delete
            </Button>
            <Button color="primary" onClick={this.toggleConfirmModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <div className={styles.createEditCardOuter}>
          <div className={styles.createEditCardHeader}>
            {id ? (
              <>
                <Button
                  color="success"
                  className={styles.btnSubmitEdit}
                  onClick={this.handleOnSubmit}
                >
                  <i className="fa fa-check mr-2" />
                  SUBMIT UPDATE
                </Button>
                <Button
                  color="danger"
                  className={styles.delete}
                  onClick={this.toggleConfirmModal}
                >
                  <i className="far fa-trash-alt mr-2" />
                  Delete
                </Button>
              </>
            ) : (
              <Button
                color="success"
                className={styles.btnSubmitCreate}
                onClick={this.handleOnSubmit}
              >
                <i className="fa fa-check mr-2" />
                SUBMIT NEW CARD
              </Button>
            )}
          </div>
          <div className={styles.textEditorContainer}>
            <ReactQuill
              className={styles.reactQuill}
              placeholder="front"
              value={front}
              onChange={this.handleFrontChange}
            />{" "}
          </div>
          <div className={styles.textEditorContainer}>
            <ReactQuill
              className={styles.reactQuill}
              placeholder="back"
              value={back}
              name="back"
              onChange={this.handleBackChange}
            />
          </div>

          <div className={styles.createEditCardFooter}>
            <Button
              color="primary"
              className={styles.btnModalClose}
              onClick={this.handleClose}
            >
              <i className="fas fa-times mr-2" />
              CLOSE
            </Button>
          </div>
        </div>
      </>
    );
  }
}

export default CreateEdit;
