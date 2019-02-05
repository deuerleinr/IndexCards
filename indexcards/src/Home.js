import React, { Component } from "react";
import "./App.css";
import {
  indexCard_getRandom,
  indexCard_pass_async,
  indexCard_ResetCards,
  indexCard_Delete
} from "./server";
import styles from "./home.module.css";
import Back from "./Back";
import Front from "./Front";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

class Home extends Component {
  state = {
    currentCard: "",
    modal: false,
    backdrop: true,
    side: ""
  };

  componentDidMount = () => {
    this.loadNewRandomCard();
  };

  async loadNewRandomCard() {
    const currentCard = await indexCard_getRandom();
    if (!currentCard) {
      const errorCardSet = {
        id: -1,
        front: "Databse error",
        totalTableRows: 0,
        totalStatusRows: 0
      };
      this.setState({ currentCard: errorCardSet }, () => {
        console.log(this.state.currentCard.front);
      });
    } else {
      this.setState({ currentCard });
      this.setState({ side: "front" });
    }
  }

  handleCardClick = () => {
    if (this.state.currentCard.id !== -1) {
      this.setState({ side: "back" });
    }
  };

  async handlePassBtn(cardId) {
    const c = this.state.currentCard;
    const req = {
      id: cardId,
      front: c.front,
      back: c.back,
      cardStatus: "passed",
      sortOrder: c.sortOrder
    };
    await indexCard_pass_async(cardId, req);
    this.loadNewRandomCard();
  }

  async handleFailBtn() {
    await this.loadNewRandomCard();
    this.setState({ side: "front" });
  }

  handleNewCardBtn = () => {
    this.props.history.push("./edit");
  };

  handleEditCardBtn = id => {
    if (this.state.currentCard.id !== -1) {
      this.props.history.push("./edit/" + id);
    }
  };

  async handleDeleteCardBtn(id) {
    if (this.state.currentCard.id !== -1) {
      const resp = await indexCard_Delete(id);
      if (resp.status >= 200 && resp.status <= 299) {
        NotificationManager.success("Card Successfully Deleted");
      } else {
        NotificationManager.error("Database Insert Error");
      }
      this.loadNewRandomCard();
    }
  }

  async handleResetCardsBtn() {
    const resp = await indexCard_ResetCards();
    if (resp.status >= 200 && resp.status <= 299) {
      NotificationManager.success("Cards Reset");
    } else {
      NotificationManager.error("Database Insert Error");
    }
    this.loadNewRandomCard();
  }

  handleLoginBtn = () => {
    alert("LOGIN STUFF");
  };

  render() {
    const { currentCard, side } = this.state;

    return (
      <div>
        <div className={styles.cardContainer}>
          {side === "back" ? (
            <Back
              back={currentCard.back}
              handlePassBtn={() => this.handlePassBtn(currentCard.id)}
              handleFailBtn={() => this.handleFailBtn()}
              handleEditCardBtn={() => this.handleEditCardBtn(currentCard.id)}
            />
          ) : (
            <div>
              <Front
                currentCard={currentCard}
                handleFrontClick={() => this.handleCardClick()}
                handleSkipBtn={() => this.loadNewRandomCard()}
                handleNewCardBtn={() => this.handleNewCardBtn()}
                handleEditCardBtn={() => this.handleEditCardBtn(currentCard.id)}
                handleResetCardsBtn={() => this.handleResetCardsBtn()}
                handleDeleteCardBtn={() =>
                  this.handleDeleteCardBtn(currentCard.id)
                }
                handleLoginBtn={() => this.handleLoginBtn()}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
