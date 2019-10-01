import React from "react";
import PropTypes from "prop-types";
import "./button.css";

const Button = ({ buttonText, onClick }) => {
  return (
    <div className="button">
      <button className="btn" onClick={() => onClick()}>
        {buttonText}
      </button>
    </div>
  );
};

Button.propTypes = {
  buttonText: PropTypes.string.isRequired
};

Button.defaultProps = {
  buttonText: "Button"
};

export default Button;
