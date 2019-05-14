import React from "react";
import _ from "lodash";
import { getLatLng, geocodeByAddress } from "./utils";
import { compose } from "./helpers";
import Input from "./Input";
import Dropdown from "./Dropdown";

import "./style.scss";

// transform snake_case to camelCase
const formattedSuggestion = structured_formatting => ({
  mainText: structured_formatting.main_text,
  secondaryText: structured_formatting.secondary_text
});

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      loading: false,
      suggestions: []
    };

    this.debouncedFetchPredictions = _.debounce(this.fetchPredictions, 300);
  }

  componentDidMount() {
    const { googleCallbackName } = this.props;
    if (googleCallbackName) {
      if (!window.google) {
        window[googleCallbackName] = this.init;
      } else {
        this.init();
      }
    } else {
      this.init();
    }
  }

  componentWillUnmount() {
    const { googleCallbackName } = this.props;
    if (googleCallbackName && window[googleCallbackName]) {
      delete window[googleCallbackName];
    }
  }

  init = () => {
    if (!window.google) {
      throw new Error(
        "[react-places-autocomplete]: Google Maps JavaScript API library must be loaded. See: https://github.com/kenny-hibino/react-places-autocomplete#load-google-library"
      );
    }

    if (!window.google.maps.places) {
      throw new Error(
        "[react-places-autocomplete]: Google Maps Places library must be loaded. Please add `libraries=places` to the src URL. See: https://github.com/kenny-hibino/react-places-autocomplete#load-google-library"
      );
    }

    this.autocompleteService = new window.google.maps.places.AutocompleteService();
    this.autocompleteOK = window.google.maps.places.PlacesServiceStatus.OK;
    this.setState(state => {
      if (state.ready) {
        return null;
      } else {
        return { ready: true };
      }
    });
  };

  handleChange = e => {
    const { value } = e.target;
    // this.props.onChange(value);
    this.setState({ address: value });
    if (!value) {
      this.clearSuggestions();
      return;
    }
    // if (this.props.shouldFetchSuggestions) {
    this.debouncedFetchPredictions();
    // }
  };

  handleSelect = (address, placeId) => {
    this.setState({ address });
    this.clearSuggestions();
    // if (this.props.onSelect) {
    //   this.props.onSelect(address, placeId);
    // } else {
    //   this.props.onChange(address);
    // }
  };

  fetchPredictions = () => {
    console.log("fetch");
    const value = this.state.address;
    if (value.length) {
      this.setState({ loading: true });
      this.autocompleteService.getPlacePredictions(
        {
          ...this.props.searchOptions,
          input: value
        },
        this.autocompleteCallback
      );
    }
  };

  autocompleteCallback = (predictions, status) => {
    this.setState({ loading: false });
    if (status !== this.autocompleteOK) {
      // this.props.onError(status, this.clearSuggestions);
      return;
    }
    // const { highlightFirstSuggestion } = this.props;
    this.setState({
      suggestions: predictions.map((p, idx) => ({
        id: p.id,
        description: p.description,
        placeId: p.place_id,
        active: false, //highlightFirstSuggestion && idx === 0 ? true : false,
        index: idx,
        formattedSuggestion: formattedSuggestion(p.structured_formatting),
        matchedSubstrings: p.matched_substrings,
        terms: p.terms,
        types: p.types
      }))
    });
  };

  clearActive = () => {
    this.setState({
      suggestions: this.state.suggestions.map(suggestion => ({
        ...suggestion,
        active: false
      }))
    });
  };

  clearSuggestions = () => {
    this.setState({ suggestions: [] });
  };

  inputProps = () => {
    const defaultInputProps = {
      type: "text",
      autoComplete: "off",
      role: "combobox",
      "aria-autocomplete": "list",
      "aria-expanded": this.getIsExpanded(),
      "aria-activedescendant": this.getActiveSuggestionId(),
      disabled: !this.state.ready
    };

    return {
      ...defaultInputProps,
      onKeyDown: compose(this.handleInputKeyDown),
      onBlur: compose(this.handleInputOnBlur)
      // value: this.props.value
      // onChange: event => {
      //   this.handleInputChange(event);
      // }
    };
  };

  getIsExpanded = () => {
    return this.state.suggestions.length > 0;
  };

  getActiveSuggestionId = () => {
    const activeSuggestion = this.getActiveSuggestion();
    return activeSuggestion ? `${activeSuggestion.placeId}` : undefined;
  };

  getActiveSuggestion = () => {
    return this.state.suggestions.find(suggestion => suggestion.active);
  };

  selectActiveAtIndex = index => {
    const activeName = this.state.suggestions.find(
      suggestion => suggestion.index === index
    ).description;
    this.setActiveAtIndex(index);
    // this.props.onChange(activeName);
  };

  handleEnterKey = () => {
    const activeSuggestion = this.getActiveSuggestion();
    if (activeSuggestion === undefined) {
      this.handleSelect(this.props.value, null);
    } else {
      this.handleSelect(activeSuggestion.description, activeSuggestion.placeId);
    }
  };

  handleDownKey = () => {
    if (this.state.suggestions.length === 0) {
      return;
    }

    const activeSuggestion = this.getActiveSuggestion();
    if (activeSuggestion === undefined) {
      this.selectActiveAtIndex(0);
    } else if (activeSuggestion.index === this.state.suggestions.length - 1) {
      this.selectUserInputValue();
    } else {
      this.selectActiveAtIndex(activeSuggestion.index + 1);
    }
  };

  handleUpKey = () => {
    if (this.state.suggestions.length === 0) {
      return;
    }

    const activeSuggestion = this.getActiveSuggestion();
    if (activeSuggestion === undefined) {
      this.selectActiveAtIndex(this.state.suggestions.length - 1);
    } else if (activeSuggestion.index === 0) {
      this.selectUserInputValue();
    } else {
      this.selectActiveAtIndex(activeSuggestion.index - 1);
    }
  };

  selectUserInputValue = () => {
    this.clearActive();
  };

  handleInputKeyDown = event => {
    /* eslint-disable indent */
    switch (event.key) {
      case "Enter":
        event.preventDefault();
        this.handleEnterKey();
        break;
      case "ArrowDown":
        event.preventDefault(); // prevent the cursor from moving
        this.handleDownKey();
        break;
      case "ArrowUp":
        event.preventDefault(); // prevent the cursor from moving
        this.handleUpKey();
        break;
      case "Escape":
        this.clearSuggestions();
        break;
    }
    /* eslint-enable indent */
  };

  handleInputOnBlur = () => {
    if (!this.mousedownOnSuggestion) {
      this.clearSuggestions();
    }
  };

  setActiveAtIndex = index => {
    this.setState({
      suggestions: this.state.suggestions.map((suggestion, idx) => {
        if (idx === index) {
          return { ...suggestion, active: true };
        } else {
          return { ...suggestion, active: false };
        }
      })
    });
  };

  getSuggestionItemProps = (suggestion, options = {}) => {
    const handleSuggestionMouseEnter = this.handleSuggestionMouseEnter.bind(
      this,
      suggestion.index
    );
    const handleSuggestionClick = this.handleSuggestionClick.bind(
      this,
      suggestion
    );

    return {
      ...options,
      key: suggestion.id,
      id: suggestion.id,
      className: `${options.className || ""} option ${
        suggestion.placeId === this.getActiveSuggestionId() ? "active" : ""
      }`.trim(),
      role: "option",
      onMouseEnter: compose(
        handleSuggestionMouseEnter,
        options.onMouseEnter
      ),
      onMouseLeave: compose(
        this.handleSuggestionMouseLeave,
        options.onMouseLeave
      ),
      onMouseDown: compose(
        this.handleSuggestionMouseDown,
        options.onMouseDown
      ),
      onMouseUp: compose(
        this.handleSuggestionMouseUp,
        options.onMouseUp
      ),
      onTouchStart: compose(
        this.handleSuggestionTouchStart,
        options.onTouchStart
      ),
      onTouchEnd: compose(
        this.handleSuggestionMouseUp,
        options.onTouchEnd
      ),
      onClick: compose(
        handleSuggestionClick,
        options.onClick
      )
    };
  };

  handleSuggestionMouseEnter = index => {
    this.setActiveAtIndex(index);
  };

  handleSuggestionMouseLeave = () => {
    this.mousedownOnSuggestion = false;
    this.clearActive();
  };

  handleSuggestionMouseDown = event => {
    event.preventDefault();
    this.mousedownOnSuggestion = true;
  };

  handleSuggestionTouchStart = () => {
    this.mousedownOnSuggestion = true;
  };

  handleSuggestionMouseUp = () => {
    this.mousedownOnSuggestion = false;
  };

  handleSuggestionClick = (suggestion, event) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    const { description, placeId } = suggestion;
    this.handleSelect(description, placeId);
    setTimeout(() => {
      this.mousedownOnSuggestion = false;
    });
  };

  render() {
    return (
      <div>
        <Input
          {...this.inputProps()}
          onChange={this.handleChange}
          value={this.state.address}
        />
        <Dropdown
          suggestions={this.state.suggestions}
          getSuggestionItemProps={this.getSuggestionItemProps}
          handleSelect={this.handleSelect}
        />
      </div>
    );
  }
}

export default LocationSearchInput;
