import React from "react";
import "./style.css";

class Dropdown extends React.Component {
  state = {
    displayMenu: false
  };

  showDropdownMenu = event => {
    event.preventDefault();
    this.setState({ displayMenu: true });
  };

  hideDropdownMenu() {
    this.setState({ displayMenu: false });
  }

  render() {
    return (
      <div className="dropdown" style={{ background: "red", width: "200px" }}>
        <div className="button" onClick={this.showDropdownMenu}>
          {" "}
          MENU{" "}
        </div>

        {this.state.displayMenu ? (
          <ul>
            <li>
              <a className="active" href="#Create Page">
                Create Page
              </a>
            </li>
            <li>
              <a href="#Manage Pages">Reset Card Deck</a>
            </li>
            <li>
              <a href="#Create Ads">Shuffle Remaining Cards</a>
            </li>
            <li>
              <a href="#Manage Ads">Select Card Set</a>
            </li>
            <li>
              <a href="#Activity Logs">Exit</a>
            </li>
          </ul>
        ) : null}
      </div>
    );
  }
}

export default Dropdown;
