import React from "react";
import styles from "./card.module.css";
import { Button } from "reactstrap";

class CreateEdit extends React.Component {
  onSubmitUpdate = () => {
    alert("submit update");
  };

  render() {
    const { currentCard } = this.props;
    return (
      <>
        <div className={styles.createEditCardHeader}>
          <Button
            color="success"
            className={styles.btnModalClose}
            onClick={this.onSubmitUpdate}
          >
            <i className="fa fa-check mr-2" />
            SUBMIT UPDATE
          </Button>{" "}
        </div>
        <div className={styles.createEditCard}>
          <input
            type="textarea"
            value={currentCard.front}
            name="front"
            onChange={this.props.onChange}
          />
        </div>
        <div className={styles.createEditCard}>
          <input
            type="textarea"
            value={currentCard.back}
            name="back"
            onChange={this.props.onChange}
          />
        </div>
        <div className={styles.createEditCardFooter}>
          <Button
            color="primary"
            className={styles.btnModalClose}
            onClick={this.props.onToggleModal}
          >
            <i className="fas fa-times" />
          </Button>
        </div>
      </>
    );
  }
}

export default CreateEdit;
