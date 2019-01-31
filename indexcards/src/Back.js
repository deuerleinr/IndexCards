import React from "react";
import styles from "./card.module.css";

class Back extends React.Component {
  render() {
    return (
      <>
        <div className={styles.root}>
          <div className={styles.menuLeft}>
            <button
              className={[styles.btn, styles.fail].join(" ")}
              onClick={this.props.handleFailBtn}
            >
              Fail <i className="fa fa-times" />
            </button>
          </div>
          <div className={styles.menuCenter}>
            <button
              className={[styles.btn, styles.edit].join(" ")}
              onClick={this.props.handleEditBtn}
            >
              <i className="fa fa-edit" />
            </button>
          </div>
          <div className={styles.menuRight}>
            <button
              className={[styles.btn, styles.pass].join(" ")}
              onClick={this.props.handlePassBtn}
            >
              Pass <i className="fa fa-check" />
            </button>
          </div>
          <div className={styles.contents}> {this.props.backContent}</div>
        </div>
      </>
    );
  }
}
export default Back;
