import React from "react";
import PlacesAutocomplete from "./PlacesAutocomplete";
import _ from "lodash";
import { getLatLng, geocodeByAddress } from "./utils";

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

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log("Success", latLng))
      .catch(error => console.error("Error", error));
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
      this.props.onError(status, this.clearSuggestions);
      return;
    }
    const { highlightFirstSuggestion } = this.props;
    this.setState({
      suggestions: predictions.map((p, idx) => ({
        id: p.id,
        description: p.description,
        placeId: p.place_id,
        active: highlightFirstSuggestion && idx === 0 ? true : false,
        index: idx,
        formattedSuggestion: formattedSuggestion(p.structured_formatting),
        matchedSubstrings: p.matched_substrings,
        terms: p.terms,
        types: p.types
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
      ...defaultInputProps
    };
  };

  getIsExpanded = () => {
    return this.state.suggestions.length > 0;
  };

  getActiveSuggestionId = () => {
    const activeSuggestion = this.getActiveSuggestion();
    return activeSuggestion
      ? `PlacesAutocomplete__suggestion-${activeSuggestion.placeId}`
      : undefined;
  };

  getActiveSuggestion = () => {
    return this.state.suggestions.find(suggestion => suggestion.active);
  };

  render() {
    return (
      <div>
        <input onChange={this.handleChange} value={this.state.address} />
        <div>
          {this.state.suggestions.map(s => {
            console.log("s", s);
            return (
              <div onClick={this.handleSelect.bind(this, s)}>
                {s.description}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default LocationSearchInput;
