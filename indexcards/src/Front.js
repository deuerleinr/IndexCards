import React from "react";
import styles from "./card.module.css";
import {
  Dropdown,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class Front extends React.Component {
  state = {
    dropdownOpen: false,
    modal: false
  };

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  toggleConfirmModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  confirm = () => {
    this.props.handleDeleteCardBtn();
    this.toggleConfirmModal();
  };

  render() {
    const { tableCount, remainCount } = this.props;

    return (
      <>
        <Modal isOpen={this.state.modal} toggle={this.toggleConfirmModal}>
          <ModalHeader toggle={this.toggleConfirmModal}>
            &nbsp; {this.props.header}
          </ModalHeader>
          <ModalBody>
            <span className={styles.confirmModalText}>
              DELETE CURRENT CARD?
            </span>
          </ModalBody>
          <ModalFooter>
            <Button color="danger m-0" onClick={this.confirm}>
              Confirm
            </Button>
            <Button color="primary" onClick={this.toggleConfirmModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <div className={styles.root}>
          <div className={styles.menuLeft}>
            <div className={styles.counter}>
              {tableCount - remainCount}
              {"/"}
              {tableCount}
              {" passed"}
            </div>
          </div>
          <div className={styles.menuCenter}>
            <button
              className={[styles.btn, styles.btnSkip].join(" ")}
              onClick={this.props.handleSkipBtn}
            >
              DRAW AGAIN
            </button>
          </div>
          <div className={styles.menuRight}>
            <Dropdown
              className={styles.dropdown}
              isOpen={this.state.dropdownOpen}
              toggle={this.toggle}
            >
              <DropdownToggle>
                <i className="fas fa-bars" />
              </DropdownToggle>
              <DropdownMenu right>
                {/* <DropdownItem header>Header</DropdownItem> */}
                <DropdownItem onClick={this.props.handleEditCardBtn}>
                  Edit this card
                </DropdownItem>
                <DropdownItem onClick={this.toggleConfirmModal}>
                  Delete this card
                </DropdownItem>
                <DropdownItem onClick={this.props.handleNewCardBtn}>
                  Create New Card
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={this.props.handleResetCardsBtn}>
                  Reset cards
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div
            className={[styles.contents, styles.front].join(" ")}
            onClick={this.props.handleFrontClick}
          >
            {this.props.frontContent}
          </div>
        </div>
      </>
    );
  }
}
export default Front;
