import React from "react";
import Header from "./Header";
import Button from "./Button";
import PropTypes from "prop-types";
import "./App.css";

/**
 * Application Wrapper
 * @constructor
 * @implements AppProps
 * @param {AppProps} props
 * @param {string} [props.headerText="App stuff..."]
 * @example <App headerText="App Title" />
 */
const App = ({ headerText }) => {
  return (
    <div className="App">
      <Button text={"purple"} />
      <Header text={headerText} />
    </div>
  );
};

App.defaultProps = {
  headerText: "App stuff..."
};

/**
 * App Component Props
 * @interface AppProps
 * @property {string} [headerText="App stuff..."] Text content.
 *
 * @example { headerText: 'App stuff...' }
 */
App.propTypes = {
  headerText: PropTypes.string
};
export default App;
