import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import "./style.scss";

/**
 * Button
 *
 *
 * <a style="border-bottom: none; display: inline-flex; flex-direction: column;" href="http://localhost:9009/?path=/story/atoms-button--with-text" target="_blank">Demo
<img style="width: 87px;" src="file:///Users/humdrum/Desktop/docs/docs/Button.png"></a>
 * @constructor
 * @implements ButtonProps
 * @param {ButtonProps} props
 * @param {string} [props.icon=null] Button icon source.
 * @param {func} [props.onClick=() => {}] Button onClick handler.
 * @param {string} [props.text=null] Text to display on button.
 *
 * @example <Button text="Button" onClick={handleClick}/>
 */
const Button = props => {
  const { className, icon, text } = props;
  const classProps = classnames(
    "btn",
    icon && "has-icon",
    text && "has-text",
    className
  );
  return (
    <button {...props} className={classProps}>
      {text && <div>{text}</div>}
      {icon && <i className={`fa fa-${icon}`} />}
    </button>
  );
};

Button.defaultProps = {
  active: false,
  className: "",
  text: null,
  icon: null,
  onClick: () => {}
};

/**
 * Button Component Props
 *
 * @interface ButtonProps
 * @property {boolean} [active=false] is tab active.
 * @property {string} [className=null] additional button wrapper class names.
 * @property {string} [icon=null] font-awesome icon name.
 * @property {func} [onClick=() => {}] onClick handler.
 * @property {string} [text=null] Text to display in button.
 *
 * @example {
 active: false,
 className: '',
 text: "Button",
 icon: "home",
 onClick: () => {}
}
 */
Button.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string
};
export default Button;
