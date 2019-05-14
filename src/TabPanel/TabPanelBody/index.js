import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import "./style.scss";

/**
 * A content wrapper that will hide/show based on activeTab.  If tab is active, content will show, if tab is inactive, content will be hidden.
 * @constructor
 * @implements TabPanelBodyProps
 * @param {TabPanelBodyProps} props
 * @param {number} [props.activeTab=0]      The currently activeTab index.
 * @param {string} [props.className=""]        Additional className to add to the TabPanelBody wrapper.
 * @param {TabPanelBodyTab[]} [props.tabs=[]]  The tabs to render in this TabPanelBody.
 *
 * @example <TabPanelBody
  activeTab={0}
  tabs={[{content: AnyReactComponent}]}
/>
 */
const TabPanelBody = ({ activeTab, className, tabs }) => {
  const classProps = classnames("tab-panel content", className);
  return (
    <div className={classProps}>
      {tabs.map((tab, i) => {
        const isActive = i === activeTab;
        const classProps = classnames("tab-panel-body", isActive && "active");

        return (
          <tab.content key={`tab=panel-body-${i}`} className={classProps} />
        );
      })}
    </div>
  );
};

TabPanelBody.defaultProps = {
  activeTab: 0,
  className: "",
  tabs: []
};

/**
 * TabPanelBodyTab
 * @global
 * @interface TabPanelBodyTab_type
 * @property {Object} content React element to show when this tab is active.
 *
 * @example {
  content: <div>Tab Content</div>
}
 */

/**
 * TabPanelBody Props
 * @interface TabPanelBodyProps
 * @property {number} [activeTab=0] The currently activeTab index.
 * @property {string} [className=""] Additional className to add to the TabPanelBody wrapper.
 * @property {TabPanelBodyTab_type[]} [tabs=[]] The tabs to render in this TabPanelBody.
 *
 * @example {
 activeTab: 1,
 tabs: [{
   content: <div>content 1</div>
 }, {
   content: <div>content 2</div>
 }]
}
 */
TabPanelBody.propTypes = {
  activeTab: PropTypes.number,
  className: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string
    })
  )
};

export default TabPanelBody;
