import React from "react";

const Dropdown = props => {
  console.log("props", props);
  return (
    <div>
      {props.suggestions.map((s, i) => {
        return (
          <div
            onClick={props.handleSelect.bind(this, s)}
            {...props.getSuggestionItemProps(s)}
          >
            {s.description}
          </div>
        );
      })}
    </div>
  );
};

export default Dropdown;
