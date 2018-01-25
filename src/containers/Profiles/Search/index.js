import React, { Component } from "react";
import classnames from "classnames";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import Tooltip from "rc-tooltip";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import {
  ageMin,
  ageMax,
  minHeight,
  maxHeight,
  education,
  ethnicBackground,
  personality,
  attendance
} from "../../../templates";
import SelectBox from "../../../components/SelectBox";

const Handle = Slider.Handle;

const handle = props => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

class Search extends Component {
  state = {
    changeLocation: false,
    location: '',
    query: {
      gender: 'F',
      min_age: 18,
      max_age: 45,
      min_height: 1,
      max_height: 139,
      ethnic_background: '',
      education: '',
      personality: '',
      attendance: '',
      radius: 50,
      keyword: '',
      latitude: '',
      longitude: ''
    }
  };

  componentWillMount() {
    if (this.props.defaultSearchParams) {
      this.setState({
        query: { ...this.state.query, max_height: this.props.defaultSearchParams.max_height }
      });
    }
  }
  componentWillReceiveProps(nextProps) {

    if (nextProps.defaultSearchParams) {
      const {max_height} = this.state.query;
      if (max_height !== nextProps.defaultSearchParams.max_height) {
        this.setState({
          query: { ...this.state.query, max_height: nextProps.defaultSearchParams.max_height }
        });
      }
    }

    if (nextProps.query) {
      if(JSON.stringify(this.state.query) !== JSON.stringify(nextProps.query) ) {
        this.setState({
          query: { ...this.state.query, ...nextProps.query }
        });
      }

      if(JSON.stringify(this.state.location) !== JSON.stringify(nextProps.location) ) {
        this.setState({
          location: nextProps.location
        });
      }

      if(JSON.stringify(this.state.changeLocation) !== JSON.stringify(nextProps.changeLocation) ) {
        this.setState({
          changeLocation: nextProps.changeLocation
        });
      }
    }
  }

  handleOnChange = ({ target: { name, value } }) => {
    this.setState({ query: { ...this.state.query, [name]: value } });
  };

  toggleLocation = e => {
    this.setState({ changeLocation: !this.state.changeLocation });
  };

  handleLocationChange = (location) => {
    this.setState({location});
  }

  handleProfileSearch = e => {
    e.preventDefault();

    const { location, changeLocation } =  this.state;

    if (!changeLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude }}) => {
        this.setState({query: {...this.state.query, latitude, longitude }}, () =>
          this.props.profileSearchRequest(this.state.query, location, changeLocation));
      });
    } else if(location) {
      geocodeByAddress(location)
      .then(results => getLatLng(results[0]))
      .then(({lat, lng}) => {
        this.setState({query: {...this.state.query, latitude: lat, longitude: lng}}, () =>
          this.props.profileSearchRequest(this.state.query, location, changeLocation));
      });
    } else {
      this.props.profileSearchRequest(this.state.query, location, changeLocation);
    }

    window.scrollTo(0, 0);
  }

  render() {
    const { query, changeLocation, location } = this.state;
    const { toggle, toggleGallery,  } = this.props;
    const openSearch = classnames("search__criteria", { open__search: toggle });
    const inputProps = {
      value: location,
      onChange: this.handleLocationChange,
      type: 'search',
      placeholder: 'Find members by state, country, zip code',
      autoFocus: true,
    }

    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div className="autosuggest__item">
        <i className="fa fa-map-marker"/>
        <strong>{formattedSuggestion.mainText}</strong>{' '}
        <small>{formattedSuggestion.secondaryText}</small>
      </div>);

    return (
      <div className="search-wrapper">
        <div>
          <div className={openSearch}>
            <div className="search__criteria__header">
              <i className="ti-close" onClick={toggleGallery} />
              <h3>Filter</h3>
            </div>
            <div>
              <div className="search__basicinfo">
                <h4>Basic Information</h4>
                <div className="search__basicinfo-field">
                  <span className="search__basicinfo-label">Gender: </span>
                  <div>
                    <label className="search__input-label">
                      <input
                        name="gender"
                        type="radio"
                        value="M"
                        checked={ query.gender === "M" ? true : false }
                        onChange={this.handleOnChange}
                      /> Male
                    </label>
                    <label className="search__input-label">
                      <input
                        name="gender"
                        type="radio"
                        value="F"
                        checked={ query.gender === "F" ? true : false }
                        onChange={this.handleOnChange}
                      /> Female
                    </label>
                  </div>
                </div>
                <div className="search__basicinfo-field">
                  <span className="search__basicinfo-label">Age Range: </span>
                  <div className="search__input-select">
                    <SelectBox
                      choices={ageMin}
                      name="min_age"
                      onChange={(val) => this.handleOnChange({target: {name: 'min_age', value: val && val && val.value}})}
                      value={query.min_age}
                      className="search__select"
                    />
                    <span className="seperator">to</span>
                    <SelectBox
                      choices={ageMax}
                      name="max_age"
                      value={query.max_age}
                      onChange={(val) => this.handleOnChange({target: {name: 'max_age', value: val && val && val.value}})}
                      className="search__select"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="search__location">
                <h4>Location</h4>
                <div className="search__location__current">
                  <div
                    onClick={this.toggleLocation}
                    className={classnames("search__location-button", {
                      active: !changeLocation
                    })}
                  >
                    Current Location
                  </div>
                  <div
                    onClick={this.toggleLocation}
                    className={classnames("search__location-button", {
                      active: changeLocation
                    })}
                  >
                    Change Location
                  </div>
                </div>
                  {changeLocation &&
                    <PlacesAutocomplete
                      inputProps={inputProps}
                      autocompleteItem={AutocompleteItem}
                      classNames={{
                        root: 'autosuggest',
                        input: 'autosuggest__input-box',
                        autocompleteContainer: 'autosuggest__container'
                      }}
                    />
                  }
                <Slider
                  min={0}
                  max={600}
                  defaultValue={query.radius}
                  value={query.radius}
                  onChange={(val) => this.handleOnChange({target: {name: 'radius', value: val}})}
                  handle={handle}
                />
                <div className="search__slider">
                  <div>
                    <p>50</p>
                    <p>Miles</p>
                  </div>
                  <div>
                    <p>100</p>
                    <p>Miles</p>
                  </div>
                  <div>
                    <p>500</p>
                    <p>Miles</p>
                  </div>
                  <div>
                    <p>Any</p>
                    <p>Miles</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="search__attributes">
                <h4>Attributes</h4>
                <div className="search__attributes-field">
                  <span>Height:</span>
                  <div className="search__attributes-height">
                    <SelectBox
                      choices={minHeight}
                      name="min_height"
                      value={query.min_height}
                      className="height"
                      onChange={(val) => this.handleOnChange({target: {name: 'min_height', value: val && val && val.value}})}
                      />
                    <span className="separator">to</span>
                    <SelectBox
                      choices={maxHeight}
                      name="max_height"
                      value={query.max_height}
                      className="height"
                      onChange={(val) => this.handleOnChange({target: {name: 'max_height', value: val && val && val.value}})}
                      />
                  </div>
                </div>
                <div className="search__attributes-field">
                  <span>Ethnicity:</span>
                  <SelectBox
                    choices={ethnicBackground}
                    name="ethnic_background"
                    value={query.ethnic_background}
                    onChange={(val) => this.handleOnChange({target: {name: 'ethnic_background', value: val && val && val.value}})}
                    />
                </div>
                <div className="search__attributes-field">
                  <span>Education:</span>
                  <SelectBox
                    choices={education}
                    name="education"
                    value={query.education}
                    onChange={(val) => this.handleOnChange({target: {name: 'education', value: val && val && val.value}})}
                    />
                </div>
                <div className="search__attributes-field">
                  <span>Personality:</span>
                  <SelectBox
                    choices={personality}
                    name="personality"
                    value={query.personality}
                    onChange={(val) => this.handleOnChange({target: {name: 'personality', value: val && val && val.value}})}
                    />
                </div>
                <div className="search__attributes-field">
                  <span>Attends Mass:</span>
                  <SelectBox
                    choices={attendance}
                    name="attendance"
                    onChange={(val) => this.handleOnChange({target: {name: 'attendance', value: val && val && val.value}})}
                    value={query.attendance}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="search__keyword">
                <h4>Keyword Search</h4>
                <input
                  type="text"
                  onChange={this.handleOnChange}
                />
                <span className="search__keyword-icon">
                  <i className="fa fa-search" />
                </span>
              </div>
            </div>
          </div>
          <div
            className={classnames(
              toggle ? "search__apply" : "search__apply--close search__apply"
            )}
            onClick={this.handleProfileSearch}
          >
            <i className="fa fa-sliders" />
            <span>Apply Filters</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
