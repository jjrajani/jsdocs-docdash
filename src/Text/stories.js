import React from "react";
import { storiesOf } from "@storybook/react";
// import { jsxDecorator } from "storybook-addon-jsx";
import { withKnobs, boolean, text } from "@storybook/addon-knobs";
import Text from "./";

storiesOf("atoms/Text", module)
  .addDecorator(withKnobs)
  .addWithJSX("default", () => {
    const paragraph = boolean("Paragraph", false);
    const textContent = text("textContent", "Lorem ipsum...");
    return <Text paragraph={paragraph}>{textContent}</Text>;
  })
  .addWithJSX("as paragraph", () => {
    const paragraph = boolean("Paragraph", true);
    const paragraphText = text(
      "paragraphText",
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a tortor cursus sem venenatis ultricies sed vitae ex. Donec malesuada ipsum sed eleifend lacinia. Maecenas laoreet dolor id justo hendrerit scelerisque. Suspendisse potenti. Etiam at erat ut augue efficitur tempus. Pellentesque mollis ante et condimentum semper. Proin vehicula, nisl suscipit varius malesuada, lectus mauris imperdiet libero, nec scelerisque nunc ligula accumsan metus.

       Fusce blandit egestas tempor. Fusce quis placerat dolor. Praesent auctor nulla nec sapien pulvinar, vel ullamcorper augue iaculis. Aenean ac lacus pretium, sollicitudin eros a, bibendum magna. Vestibulum lectus leo, volutpat sed faucibus sit amet, accumsan eget nibh. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed porta eu magna vel consectetur. Vestibulum sodales mauris non magna efficitur malesuada.

       Praesent pulvinar interdum consequat. Donec non lorem egestas, mattis nibh sit amet, lacinia purus. Sed ac purus eu risus venenatis fermentum at ut quam. Ut luctus quam eget convallis rutrum. Curabitur sit amet est quis velit molestie maximus scelerisque in sem. Vivamus sapien nisi, ullamcorper quis porta nec, malesuada placerat sem. Vivamus eleifend commodo erat at semper. Integer iaculis quam in orci elementum, quis auctor ligula egestas.

       Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean dapibus vulputate elementum. Ut euismod varius sapien eget ultrices. Aliquam vel nunc id nibh scelerisque commodo et id nisi. Quisque quam eros, facilisis nec metus sed, pretium condimentum turpis. Donec vitae venenatis nisl.

       Phasellus ornare eleifend nisi, id consequat nibh vehicula at. Duis egestas nulla eu mi dictum, ut lacinia arcu cursus. Etiam luctus neque vel erat pellentesque, non egestas magna rhoncus.`
    );
    return <Text paragraph={paragraph}>{paragraphText}</Text>;
  });
