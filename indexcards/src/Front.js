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
    const {
      id,
      totalTableRows,
      totalStatusRows,
      front
    } = this.props.currentCard;

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
        <div className={styles.root}>
          <div className={styles.menuLeft}>
            <div className={styles.counter}>
              {totalTableRows - totalStatusRows}
              {"/"}
              {totalTableRows}
              {" passed"}
            </div>
          </div>
          <div className={styles.menuCenter}>
            <button
              className={[styles.btn, styles.btnDrawAgain].join(" ")}
              onClick={this.props.handleSkipBtn}
            >
              Draw again
            </button>
          </div>
          <div className={styles.menuRight}>
            <Dropdown
              className={styles.menuContainer}
              isOpen={this.state.dropdownOpen}
              toggle={this.toggle}
            >
              <DropdownToggle className={styles.menu}>Menu</DropdownToggle>
              <DropdownMenu right>
                {/* <DropdownItem header>Header</DropdownItem> */}

                {id === -1 ? (
                  <>
                    <DropdownItem disabled>Edit this card</DropdownItem>
                    <DropdownItem disabled>Delete this card</DropdownItem>
                  </>
                ) : (
                  <>
                    <DropdownItem onClick={this.props.handleEditCardBtn}>
                      Edit this card
                    </DropdownItem>
                    <DropdownItem onClick={this.toggleConfirmModal}>
                      Delete this card
                    </DropdownItem>
                  </>
                )}

                <DropdownItem onClick={this.props.handleNewCardBtn}>
                  Create New Card
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={this.props.handleResetCardsBtn}>
                  Reset cards
                </DropdownItem>
                {/* <DropdownItem divider />
                <DropdownItem onClick={this.props.handleLoginBtn}>
                  Login
                </DropdownItem> */}
              </DropdownMenu>
            </Dropdown>
          </div>
          <div
            className={[styles.contents, styles.front].join(" ")}
            onClick={this.props.handleFrontClick}
          >
            <div dangerouslySetInnerHTML={{ __html: front }} />
          </div>
        </div>
      </>
    );
  }
}
export default Front;
