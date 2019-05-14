import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, array, text } from "@storybook/addon-knobs";
import { State, Store } from "@sambego/storybook-state";

import TabPanelHeader from "./";

const store = new Store({
  activeTab: 0
});

storiesOf("molecules/TabPanelHeader", module)
  .addDecorator(withKnobs)
  .addWithJSX("default", () => {
    const onClick = tabIndex => {
      store.set({ activeTab: tabIndex });
    };
    const tabs = array("tabs", [
      { text: text("Tab 0 Title", "Home") },
      { text: text("Tab 1 Title", "Settings") },
      { text: text("Tab 2 Title", "Shop") },
      { text: text("Tab 3 Title", "Profile") }
    ]);
    return (
      <State store={store}>
        <TabPanelHeader
          activeTab={store.state.activeTab}
          tabs={tabs}
          onTabClick={onClick}
        />
      </State>
    );
  });
