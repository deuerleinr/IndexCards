import React from "react";
import styles from "./card.module.css";

class Back extends React.Component {
  render() {
    const { back } = this.props;
    return (
      <>
        <div className={[styles.root, styles.back].join(" ")}>
          <div className={styles.menuLeft}>
            <button
              className={[styles.btn, styles.btnFail].join(" ")}
              onClick={this.props.handleFailBtn}
            >
              <i className="fa fa-times mr-2" />
              Fail
            </button>
          </div>
          <div className={styles.menuCenter}>
            <button
              className={[styles.btn, styles.btnEdit].join(" ")}
              onClick={this.props.handleEditCardBtn}
            >
              <i className="fa fa-edit mr-2" />
              Edit
            </button>
          </div>
          <div className={styles.menuRight}>
            <button
              className={[styles.btn, styles.btnPass].join(" ")}
              onClick={this.props.handlePassBtn}
            >
              <i className="fa fa-check mr-2" />
              Pass
            </button>
          </div>
          <div
            className={[styles.contents, styles.back].join(" ")}
            dangerouslySetInnerHTML={{ __html: back }}
          />
        </div>
      </>
    );
  }
}
export default Back;
