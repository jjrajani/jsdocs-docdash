import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, array, number, text } from "@storybook/addon-knobs";
import Input from "./";

storiesOf("organisms/Input", module)
  .addDecorator(withKnobs)
  .addWithJSX("default", () => {
    const activeTab = number("activeTab", 0);
    const tabs = array("tabs", [
      {
        text: text("Tab 0 Title", "Home"),
        content: ({ className }) => (
          <div className={className}>0 Lorem ipsum...</div>
        )
      }
    ]);
    return <Input />;
  });
