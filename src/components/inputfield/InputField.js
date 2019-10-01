import React from "react";
import "./inputfield.css";
import PropTypes from "prop-types";

const Inputfield = ({
  label,
  id,
  type,
  placeholder,
  name,
  value,
  onChange
}) => {
  return (
    <div className="input-container">
      <label htmlFor="form-title">
        <b>{label}</b>
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

Inputfield.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

Inputfield.defaultProps = {
  label: "Input",
  id: "",
  type: "text",
  placeholder: "",
  name: "",
  onChange: () => {}
};

export default Inputfield;
