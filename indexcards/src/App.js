import React, { Component } from "react";
import { Modal } from "reactstrap";
import "./App.css";
import { indexCard_getRandom, indexCard_update_async } from "./server";
import styles from "./App.module.css";
import Back from "./Back";
import Front from "./Front";
import CreateEdit from "./CreateEdit";

class App extends Component {
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
    console.log(currentCard);
    if (!currentCard) {
      const emptyCardSet = {
        id: -1,
        front: "No cards remaining in set",
        totalTableRows: 0,
        totalStatusRows: 0
      };
      this.setState({ currentCard: emptyCardSet }, () => {
        console.log(this.state.currentCard.front);
      });
    } else {
      this.setState({ currentCard });
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
    const resp = await indexCard_update_async(cardId, req);
    console.log(resp);
    this.setState({ side: "front" }, () => {
      this.loadNewRandomCard();
    });
  }

  onToggleModal = () => {
    const modal = this.state.modal;
    this.setState({ modal: !modal });
  };

  handleFailBtn = cardId => {
    this.setState({ side: "front" }, () => {
      this.loadNewRandomCard();
    });
  };

  handleEditBtn = () => {
    this.onToggleModal();
  };

  render() {
    const { currentCard, side } = this.state;

    return (
      <div>
        <div className={styles.cardContainer}>
          {side === "back" ? (
            <Back
              backContent={currentCard.back}
              handlePassBtn={() => this.handlePassBtn(currentCard.id)}
              handleFailBtn={() => this.handleFailBtn()}
              handleEditBtn={() => this.handleEditBtn()}
            />
          ) : (
            <div>
              <Front
                frontContent={currentCard.front}
                tableCount={currentCard.totalTableRows}
                remainCount={currentCard.totalStatusRows}
                handleFrontClick={() => this.handleCardClick()}
                handleSkipBtn={() => this.loadNewRandomCard()}
              />
            </div>
          )}
        </div>

        <Modal
          isOpen={this.state.modal}
          toggle={this.onToggleModal}
          backdrop={this.state.backdrop}
          className={styles.modal}
          style={{ width: "500px", maxWidth: "100vw" }}
        >
          <CreateEdit
            onToggleModal={this.onToggleModal}
            onChange={this.onChange}
            currentCard={currentCard}
          />
        </Modal>
      </div>
    );
  }
}

export default App;
