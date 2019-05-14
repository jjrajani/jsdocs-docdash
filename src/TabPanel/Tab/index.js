import React from "react";
import PropTypes from "prop-types";
import Button from "../../Button";
import classnames from "classnames";

import "./style.scss";

/**
 * Tab panel active tab selector.
 *
 *
 * <a style="border-bottom: none; display: inline-flex; flex-direction: column;" href="http://localhost:9009/?path=/story/molecules-tab--default" target="_blank">Demo<img src="file:///Users/humdrum/Desktop/docs/docs/Tab.png" style="width: 171px;"></a>
 * @constructor
 * @implements TabProps
 * @param {TabProps} props
 * @param {Boolean}   [props.isActive=true]       If this tab is active.
 * @param {String}    [props.className=""]        Additional className to add to the Tab wrapper.
 * @param {String}    [props.icon=""]             The icon to show in the tab.
 * @param {Function}  [props.onClick="() => {}"]  Tab click handler.
 * @param {Number}    [props.tabIndex=0]          The tabIndex associated with this tab.
 * @param {String}    [props.text=""]             The text to show in the tab.
 *
 * @example <Tab
   isActive={false}
   icon={"gearwheel"}
   text="Settings"
   tabIndex={2}
   onClick={() => {}}
 />
 *
 */
const Tab = props => {
  const classProps = classnames("tab", props.active ? "active" : "");
  return <Button {...props} className={classProps} />;
};

Tab.defaultProps = {
  isActive: true,
  className: null,
  icon: null,
  onClick: () => {},
  tabIndex: 0,
  text: null
};

/**
 * Tab Component Props
 * @interface TabProps
 * @property {boolean} [isActive=true] If this tab is active.
 * @property {string} [className=null] Additional className to add to the TabPanelHeader wrapper.
 * @property {string} [icon=null] The icon to show in the tab.
 * @property {function} [onClick="() => {}"] The tab click handler.
 * @property {string} [text=null] The text to show in the tab.
 * @example {
 isActive: false,
 icon: 'home',
 text: 'Tab Title',
 onClick: () => {}
}
 */
Tab.propTypes = {
  isActive: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  tabIndex: PropTypes.number,
  text: PropTypes.string
};
export default Tab;
