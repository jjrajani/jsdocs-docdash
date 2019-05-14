import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, object } from "@storybook/addon-knobs";
import Button from "./";

storiesOf("atoms/Button", module)
  .addDecorator(withKnobs)
  .addWithJSX("with text", () => {
    const buttonText = text("ButtonText", "Button");
    const textBtnStyles = object("Styles", {});
    return <Button text={buttonText} style={textBtnStyles} />;
  })
  .addWithJSX("with icon", () => {
    const icon = text("Icon", "close");
    const iconBtnStyles = object("Styles", {});
    return <Button icon={icon} style={iconBtnStyles} />;
  })
  .addWithJSX("with text and icon", () => {
    const icon = text("Icon", "close");
    const buttonText = text("ButtonText", "Button");
    const iconTextBtnStyles = object("Styles", {});
    return <Button text={buttonText} icon={icon} style={iconTextBtnStyles} />;
  });
