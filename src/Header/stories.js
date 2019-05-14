import React from "react";
import { storiesOf } from "@storybook/react";
import Header from "./";
import LOGO from "../logo.svg";

storiesOf("molecules/Header", module)
  .addWithJSX("default", () => <Header />)
  .addWithJSX("with text", () => <Header text={"Header Title"} />)
  .addWithJSX("with logo", () => <Header logo={LOGO} />)
  .addWithJSX("with text && logo", () => (
    <Header logo={LOGO} text={"Header Title"} />
  ));
