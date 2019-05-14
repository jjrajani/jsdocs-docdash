import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import "./style.scss";

/**
 * Text
 *
 *
 * <a style="border-bottom: none; display: inline-flex; flex-direction: column;" href="http://localhost:9009/?path=/story/atoms-text--as-paragraph" target="_blank">Demo
<img style="width: 540px;" src="file:///Users/humdrum/Desktop/docs/docs/Text.png"></a>
 * @constructor
 * @implements TextProps
 * @param {TextProps} props
 * @param {string} [props.children="Lorem Ipsum..."] Text content.
 * @param {boolean} [props.paragraph=false] Show with paragraph styles.
 *
 * @example <Text>This is text content...</Text>
 */
const Text = ({ children, paragraph }) => {
  console.log("paragraph", paragraph);
  const classProps = classnames("text", paragraph && "paragraph");
  return <p className={classProps}>{children}</p>;
};

Text.defaultProps = {
  children: "Lorem Ipsum...",
  paragraph: false
};

/**
 * Text Component Props
 * @interface TextProps
 * @property {string} [children="Lorem Ipsum..."] Text content.
 * @property {boolean} [paragraph=false] Show with paragraph styles.
 * @example {
 children: "Lorem ipsum...",
 paragraph: true
}
 */
Text.propTypes = {
  children: PropTypes.string,
  paragraph: PropTypes.bool
};
export default Text;
