import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "antd";
import "./navbar.css";
import Button from "../button/Button";
import PropTypes from "prop-types";

const Navbar = ({ formToggle }) => {
  return (
    <div className="navbar-container">
      <ul>
        <li>
          <NavLink to="/" exact activeClassName="active">
            <span>
              <Icon type="reddit" className="reddit-icon" />
              <p className="logo-name">reddit.</p>
            </span>
          </NavLink>
        </li>
        <li>
          <Button buttonText="Add Post" onClick={formToggle} />
        </li>
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  formToggle: PropTypes.func.isRequired
};

Navbar.defaultProps = {
  formToggle: () => {}
};

export default Navbar;
