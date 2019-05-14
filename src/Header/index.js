import React from "react";
import PropTypes from "prop-types";
import Text from "../Text";

import "./style.scss";

/**
 * Header
 * @implements HeaderProps
 * @constructor
 * @param {HeaderProps} props
 * @param {node|node[]} [props.children=null] Additional heder elements.
 * @param {string} [props.logo=null] Header logo.
 * @param {string} [props.text=null] Header title.
 *
 * @example <Header
 *  logo="logo.src"
 *  text="react example app text"
 * >
 *  <a>Link</a>
 * </Header>
 */
const Header = ({ children, logo, text }) => (
  <header className="App-header">
    {logo && <img src={logo} className="App-logo" alt="logo" />}
    {text && <Text>{text}</Text>}
    {children && children}
  </header>
);

Header.defaultProps = {
  children: null,
  logo: null,
  text: null
};

/**
 * Header Component Props
 * @interface HeaderProps
 * @property {node|node[]} [props.children=null] Additional heder elements.
 * @property {string} [props.logo=null] Header logo.
 * @property {string} [props.text=null] Header title.
 *
 * @example {
 logo: 'logo.src',
 text: 'App Name',
 children: null
}
 */
Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  logo: PropTypes.string,
  text: PropTypes.string
};

export default Header;
