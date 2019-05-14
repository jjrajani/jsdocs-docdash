import React, { Component } from "react";
import PropTypes from "prop-types";
import TabPanelHeader from "./TabPanelHeader";
import TabPanelBody from "./TabPanelBody";

import "./style.scss";

/**
 * A panel with a header, header tabs, and body panel.  Header tabs act as a navigation for the body panel.  Bpdy panel content shown will depend upon which header tab is active.
 * @param {object} props The index of the selected tab.
 * @param {number} [props.activeTab=0] The index of the selected tab.
 * @param {Tab[]} [props.tabs=[]] The tabs that will live in this tab panel.
 */
export default class TabPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: props.activeTab
    };
  }
  /**
   * If props.activeTab has changed and no longer matches this.state.activeTab, set this.state.activeTab = this.props.activeTab.
   * @param  {TabPanelProps} newProps [description]
   */
  componentWillReceiveProps = newProps => {
    if (newProps.activeTab !== this.state.activeTab) {
      this.setState({ activeTab: newProps.activeTab });
    }
  };
  /**
   * onTabClick handler.  When tab is clicked, set this.state.activeTab to the provided tabIndex.
   * @param  {number} tabIndex The new activeTab index.
   */
  toggleTab = tabIndex => {
    if (this.state.activeTab !== tabIndex) {
      this.setState({ activeTab: tabIndex });
    }
  };
  render() {
    return (
      <div className="tab-panel">
        <div className="tab-panel header">
          <TabPanelHeader
            activeTab={this.state.activeTab}
            tabs={this.props.tabs}
            onTabClick={this.toggleTab}
          />
        </div>
        <TabPanelBody activeTab={this.state.activeTab} tabs={this.props.tabs} />
      </div>
    );
  }
}

TabPanel.defaultProps = {
  activeTab: 0,
  tabs: []
};

/**
 * TabPanelTab
 * @interface TabPanelTab_type
 * @property {string} [icon=""] The icon to show in the tab.
 * @property {string} [text=""] The text to show in the tab.
 * @property {object} tabContent The panel to show in the body when this tab is active.
 * @example {
 icon: 'home',
 text: 'Tab Title',
 tabContent: <div>content</div>
}
 */

/**
 * TabPanel Component Props
 * @interface TabPanelProps
 * @property {number} [activeTab=0] The index of the selected tab.
 * @property {TabPanelTab_type[]} [tabs=[]] The tabs that will live in this tab panel.
 * @example {
 activeTab: 0,
 tabs: [{
   text: 'Tab Title',
   icon: 'home',
   tabContent: <div>content</div>
 }]
}
 */
TabPanel.propTypes = {
  activeTab: PropTypes.number,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      icon: PropTypes.string,
      tabContent: PropTypes.element
    })
  )
};
