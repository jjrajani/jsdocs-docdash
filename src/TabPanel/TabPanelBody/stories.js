import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, array } from "@storybook/addon-knobs";

import TabPanelBody from "./";

storiesOf("molecules/TabPanelBody", module)
  .addDecorator(withKnobs)
  .addWithJSX("default", () => {
    const tabs = array("tabs", [
      {
        content: ({ className }) => (
          <div className={className}>0 Lorem ipsum...</div>
        )
      }
    ]);
    return <TabPanelBody activeTab={0} tabs={tabs} />;
  });
