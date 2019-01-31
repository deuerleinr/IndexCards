import React from "react";
import styles from "./card.module.css";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class Front extends React.Component {
  state = {
    dropdownOpen: false
  };

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  render() {
    const { tableCount, remainCount } = this.props;

    return (
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
              <DropdownItem>Edit this card</DropdownItem>
              <DropdownItem>Create new card</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Reset cards</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className={styles.contents} onClick={this.props.handleFrontClick}>
          {this.props.frontContent}
        </div>
      </div>
    );
  }
}
export default Front;
