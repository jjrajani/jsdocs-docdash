import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, boolean, number, text } from "@storybook/addon-knobs";
import { actions } from "@storybook/addon-actions";
import Tab from "./";

storiesOf("molecules/Tab", module)
  .addDecorator(withKnobs)
  .addWithJSX("default", () => {
    const classProps = text("className", "Lorem ipsum...");
    const icon = text("icon", "trash");
    const active = boolean("active", false);
    const textContent = text("textContent", "Lorem ipsum...");
    const tabIndex = number("tabIndex", 0);
    const act = actions("onClick");

    return (
      <Tab
        active={active}
        className={classProps}
        icon={icon}
        onClick={act.onClick.bind(this, tabIndex)}
        tabIndex={tabIndex}
        text={textContent}
      />
    );
  });
