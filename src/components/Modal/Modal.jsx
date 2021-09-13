import React from "react";
import PropTypes from "prop-types";
import s from "./Modal.module.css";

export default class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentDidUnMount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.hideModal();
    }
  };

  onClickOverlay = (e) => {
    if (e.target.className === "Modal_Overlay__1BatF") {
      this.props.hideModal();
    }
  };

  render() {
    return (
      <div className={s.Overlay} onClick={this.onClickOverlay}>
        <div className={s.Modal}>
          <img src={this.props.bigModalImage} alt="Not found." />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  bigModalImage: PropTypes.string.isRequired,
  hideModal: PropTypes.func.isRequired,
};
