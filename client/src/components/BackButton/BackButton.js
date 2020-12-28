import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./BackButton.module.sass";

const BackButton = (props) => {
  function clickHandler() {
    props.history.goBack();
    // clear form
  }

  return (
    <div onClick={clickHandler} className={styles.buttonContainer}>
      <span>Back</span>
    </div>
  );
};

export default withRouter(BackButton);
