import React, { Component } from "react";
import classnames from "classnames";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Gallery from "./Gallery";
import Search from "./Search";
import LocalSpinner from '../../components/LocalSpinner';

import { profileActions, memberProfileActions } from '../../actions';
import { helperSelectors, profileSelectors, memberProfileSelectors } from '../../selectors';

const PER_PAGE = 9;
const PER_FETCH_ACCOUNT = 25;

class Profiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      fetchPage: 1,
      query: null,
      location: '',
      changeLocation: false
    }
  }

  componentDidMount() {
    const { members, fetchProfileRequest, fetchDefaultSearchParamsRequest } = this.props;

    if (!members.profiles) {
      fetchProfileRequest();
    } else {

      if (window.galleryCurrentPage) {
        this.setState({
          currentPage: window.galleryCurrentPage,
          query: window.galleryQuery,
          fetchPage: window.galleryFetchPage,
          location: window.galleryLocation,
          changeLocation: window.galleryChangeLocation
        });
      }
    }

    fetchDefaultSearchParamsRequest();
  }

  render() {
    const { members, isLoading, defaultSearchParams, toggleGallery, profileSearchRequest } = this.props;
    const { toggle, meta, profiles } = members;

    let total_count = 0;
    let total_page = 0;
    if (meta) {
      total_count = meta['total_count'];
      total_page = Math.ceil(total_count / PER_PAGE);
    }

    const { currentPage } = this.state;
    const toggleSearch = classnames("profiles__header", { "profiles__header--close": toggle });
    return (
      <div>
         <div className={toggleSearch} onClick={toggleGallery}>
          {toggle?
            <div className="profiles__search-btn"><i className="fa fa-sliders"/><span>Close Filter</span></div>:
            <div><i className="fa fa-sliders"/><span>Filter Matches</span></div>
          }
        </div>

        <div className={classnames(toggle ? "profiles-wrapper--open": "profiles-wrapper")}>
          <LocalSpinner loaded={!isLoading} />
          <Search
            toggle={toggle}
            toggleGallery={toggleGallery}
            profileSearchRequest={(query, location, changeLocation)=>{
              window.galleryLocation = location;
              window.galleryChangeLocation = changeLocation;
              window.galleryQuery = query;
              window.galleryCurrentPage = 1;

              this.setState({
                fetchPage: 1,
                currentPage: 1,
                query: query,
                location: location,
                changeLocation: changeLocation
              }, ()=>{
                profileSearchRequest(query, PER_FETCH_ACCOUNT, 1, true);
              });
            }}
            query={this.state.query}
            location={this.state.location}
            changeLocation={this.state.changeLocation}
            defaultSearchParams={defaultSearchParams}
          />
          <Gallery
            members={profiles}
            currentPage={currentPage}
            totalCount={total_count}
            totalPage={total_page}
            isLoading={isLoading}
            onSelectPage={(currentPage)=>{
              const { fetchPage, query } = this.state;

              window.galleryCurrentPage = currentPage;
              window.galleryQuery = query;
              window.galleryFetchPage = fetchPage;

              if ((PER_PAGE*currentPage > profiles.length) && (profiles.length<total_count)) {
                this.setState({
                  fetchPage: (fetchPage+1)
                }, ()=>{
                  window.galleryFetchPage = this.state.fetchPage;
                  profileSearchRequest(query, PER_FETCH_ACCOUNT, this.state.fetchPage, false);
                });
              }
              this.setState({
                currentPage: currentPage
              });
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return createStructuredSelector({
    members: profileSelectors.selectProfile(),
    isLoading: helperSelectors.isLoadingSelector(),
    defaultSearchParams: memberProfileSelectors.defaultSearchParamsSelector()
  });
}

const mapDispatchToProps = {
  toggleGallery: profileActions.toggleGallery,
  fetchProfileRequest: profileActions.fetchProfileRequest,
  profileSearchRequest: profileActions.profileSearchRequest,
  setProfileEmpty: profileActions.setProfileEmpty,
  fetchDefaultSearchParamsRequest: memberProfileActions.fetchDefaultSearchParamsRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
