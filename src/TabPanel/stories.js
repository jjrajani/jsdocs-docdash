import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, array, number, text } from "@storybook/addon-knobs";
import TabPanel from "./";

storiesOf("organisms/TabPanel", module)
  .addDecorator(withKnobs)
  .addWithJSX("default", () => {
    const activeTab = number("activeTab", 0);
    const tabs = array("tabs", [
      {
        text: text("Tab 0 Title", "Home"),
        content: ({ className }) => (
          <div className={className}>0 Lorem ipsum...</div>
        )
      },
      {
        text: text("Tab 1 Title", "Settings"),
        content: ({ className }) => (
          <div className={className}>1 Lorem ipsum...</div>
        )
      },
      {
        text: text("Tab 2 Title", "Shop"),
        content: ({ className }) => (
          <div className={className}>2 Lorem ipsum...</div>
        )
      },
      {
        text: text("Tab 3 Title", "Profile"),
        content: ({ className }) => (
          <div className={className}>3 Lorem ipsum...</div>
        )
      }
    ]);
    return <TabPanel activeTab={activeTab} tabs={tabs} />;
  });
