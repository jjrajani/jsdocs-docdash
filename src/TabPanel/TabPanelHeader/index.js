import React from "react";
import PropTypes from "prop-types";
import Tab from "../Tab";
import classnames from "classnames";

import "./style.scss";

/**
 * Header that contains tabs.
 *
 *
 * <a style="border-bottom: none; display: inline-flex; flex-direction: column;" href="http://localhost:9009/?path=/story/molecules-tabpanelheader--default" target="_blank">Demo
<img style="width: 336px;" src="file:///Users/humdrum/Desktop/docs/docs/TabPanelHeader.png"></a>
 * @constructor
 * @implements TabPanelHeaderProps
 * @param {TabPanelHeaderProps} props
 * @param {number} [props.activeTab=0]  The active tab index.
 * @param {string} [props.className=""] Additional classNames to add to the TabPanelHeader wrapper.
 * @param {function} [props.onTabClick="() => {}"] Tab click handler function.
 * @param {Tab[]} [props.tabs=[]] The tabs that will live in this tab panel.
 *
 * @example <TabPanelHeader
  activeTab={0}
  tabs={[{ text: "Settings", icon: 'hearwheel' }]}
  onTabClick={ (tabIndex) => {} }
/>
 */
const TabPanelHeader = ({ activeTab, className, onTabClick, tabs }) => {
  const classProps = classnames("tab-panel header", className);
  return (
    <div className={classProps}>
      {tabs.map((tab, i) => {
        const active = i === activeTab;
        return (
          <Tab
            key={`tab-${i}`}
            active={active}
            icon={tab.icon}
            onClick={onTabClick.bind(this, i)}
            tabIndex={i}
            text={tab.text}
          />
        );
      })}
    </div>
  );
};

TabPanelHeader.defaultProps = {
  activeTab: 0,
  className: "",
  onTabClick: () => {},
  tabs: []
};

/**
 * TabPanelHeader Component Props
 * @interface TabPanelHeaderProps
 * @property {number} [activeTab=0] The index of the selected tab.
 * @property {string} [className=""] Additional className to add to the TabPanelHeader wrapper.
 * @property {function} [onTabClick=() => {}] Tab click handler function.
 * @property {Tab[]} [tabs=[]] The tabs that will live in this tab panel.
 *
 * @example {
 activeTab: 0,
 tabs: [{
   text: 'Tab Title',
   icon: 'home'
 }],
 onTabClick: () => {}
}
 */
TabPanelHeader.propTypes = {
  activeTab: PropTypes.number,
  className: PropTypes.string,
  onTabClick: PropTypes.func,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      icon: PropTypes.string
    })
  )
};

export default TabPanelHeader;
