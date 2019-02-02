import React from "react";
import styles from "./createEdit.module.css";
import { Button } from "reactstrap";
import {
  indexCard_create_async,
  indexCard_GetById,
  indexCard_update_async
} from "./server";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

class CreateEdit extends React.Component {
  state = {
    id: "",
    front: "",
    back: "",
    cardStatus: "notpassed",
    sortOrder: 0,
    dateCreated: "",
    dateModified: ""
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
    console.log(resp);
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
    if (this.state.id) {
      this.onUpdateCurrentCard();
    } else {
      this.onCreateNewCard();
    }
  };

  async onUpdateCurrentCard() {
    const { id, front, back, cardStatus, sortOrder } = this.state;
    const req = { id, front, back, cardStatus, sortOrder };
    const cardId = this.state.id;
    const resp = await indexCard_update_async(cardId, req);
    console.log(resp);
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
    console.log(resp);
    if (resp.status >= 200 && resp.status <= 299) {
      NotificationManager.success("Card Successfully Created");
    } else {
      NotificationManager.error("Database Insert Error");
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { id, front, back } = this.state;
    return (
      <>
        <div className={styles.cardOuter}>
          <div className={styles.createEditCardHeader}>
            <Button
              color="success"
              className={styles.btnModalClose}
              onClick={this.handleOnSubmit}
            >
              <i className="fa fa-check mr-2" />
              SUBMIT {id ? "UPDATE" : "NEW CARD"}
            </Button>{" "}
          </div>
          <div className={styles.createEditCard}>
            <textarea
              placeholder="front"
              value={front}
              name="front"
              onChange={this.onChange}
            />
          </div>
          <div className={styles.createEditCard}>
            <textarea
              placeholder="back"
              value={back}
              name="back"
              onChange={this.onChange}
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
