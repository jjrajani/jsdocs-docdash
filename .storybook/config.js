import {
  configure,
  setAddon,
  addDecorator,
  addParameters
} from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import JSXAddon from "storybook-addon-jsx";

import "font-awesome/css/font-awesome.min.css";
import "../src/index.css";
import "./styles.css";

const options = {};
addParameters({ viewport: options });
setAddon(JSXAddon);
addDecorator(withInfo);

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  requireAll(require.context("../src", true, /stories\.js?$/));
}

configure(loadStories, module);
