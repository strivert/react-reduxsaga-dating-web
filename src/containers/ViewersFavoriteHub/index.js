import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Link from 'react-router-dom/Link';
import MemberCard from '../../components/MemberCard';
import Pagination from '../../components/Pagination';
import LocalSpinner from '../../components/LocalSpinner';
import NotificationSystem from '../../components/NotificationSystem';
import { viewersFavoriteSelectors, helperSelectors } from '../../selectors';
import { viewersFavoriteActions, helperActions } from '../../actions';

const PER_PAGE = 9;

class ViewersFavoriteHub extends Component {
  state = {
    toggleFavorite: false,
    currentPage: 1,
  }

  componentDidMount() {
    const {
      favorites,
      setComponentLoadingRequest,
      fetchProfileRequest
    } = this.props;
    
    if(!favorites) {
      setComponentLoadingRequest(true);
      fetchProfileRequest('favorites');
    } else {
      setComponentLoadingRequest(false);
    }
    
    if (window.favoritesSelected===undefined || window.favoritesSelected === true) {
      this.setState({
        toggleFavorite: false,
        currentPage: (window.viewersCurrentPage) ? window.viewersCurrentPage : 1
      });
    } else if (window.viewersSelected === true) {
      this.setState({
        toggleFavorite: true,
        currentPage: (window.favoritesCurrentPage) ? window.favoritesCurrentPage : 1
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const {toggleFavorite, currentPage} = this.state;
    const {favorites, viewers} = nextProps;
    if(!toggleFavorite) {
      if (favorites && (favorites.length <= PER_PAGE*(currentPage-1))) {
        this.setState({
          currentPage: (currentPage-1) 
        });
      }
    } else {
      if (viewers && (viewers.length <= PER_PAGE*(currentPage-1))) {
        this.setState({
          currentPage: (currentPage-1) 
        });
      }
    }
  }

  fetchProfiles = selected => {
    const {
      favorites,
      viewers,
      setComponentLoadingRequest,
      fetchProfileRequest
    } = this.props;
    const options = {
      favorites,
      viewers
    }
    if(!options[selected]) {
      setComponentLoadingRequest(true);
      fetchProfileRequest(selected);
    } else {
      setComponentLoadingRequest(false);
    }

    window.favoritesSelected = false;
    window.viewersSelected = false;
    if (selected === 'favorites') {
      window.favoritesSelected = true;
    } else if (selected === 'viewers') {
      window.viewersSelected = true;      
    }

    this.setState(({toggleFavorite}) => ({toggleFavorite: !toggleFavorite}));
  };

  removeFavorite = (id, e) => {
    e.preventDefault();
    this.props.deleteFavoriteProfileRequest(id);
  };


  renderFavoriteProfiles (favorites) {
    const {currentPage} = this.state;
    if (favorites && favorites.length > 0) {

      let pagedMembers = [];
      if (favorites && favorites.length) {
        pagedMembers = favorites.slice(
          Math.max(0, (currentPage - 1) * PER_PAGE),
          currentPage * PER_PAGE
        );
      }

      return pagedMembers.map(member => (
        <MemberCard
          key={member.id}
          member={member}
          addTrash={true}
          removeFavorite={this.removeFavorite.bind(null, member.id)}
        />
      ))
    } 
     return (
      <div className="no__viewer__favorite">
      <p>You don't have any favorites yet! </p>
      <Link to="/profiles">Click here</Link> to browse profiles.
    </div>)
  }

  renderViewerProfiles (viewers) {
    if(viewers && viewers.length > 0) {
      return viewers.map(member => (
        <MemberCard
          key={member.id}
          member={member}
          lastViewed={true}
        />
      ));
    }
    return (
      <div className="no__viewer__favorite">
        <p>No One Has Viewed Your Profile Yet</p>
        <p>But don't worry! You can increase the number of views by interacting with other members. 
          Like their profile activities, send them icebreakers, or send them a message!
        </p>
      </div>
    )
  }

  onSelectPage (currentPage) {
    const { toggleFavorite } = this.state;
    if (!toggleFavorite) {
      window.viewersCurrentPage = currentPage;
    } else {
      window.favoritesCurrentPage = currentPage;
    }
    this.setState({
      currentPage: currentPage
    });
    window.scrollTo(0, 0);
  }

  render() {
    const { isLoading, favorites, viewers, notification, dismissToaster } = this.props;
    const { toggleFavorite, currentPage } = this.state;

    const totalPage = toggleFavorite
      ? ( viewers ? Math.ceil(viewers.length / PER_PAGE) : 0 )
      : ( favorites ? Math.ceil(favorites.length / PER_PAGE) : 0);

    return (
      <div className="favorite-viewers">
        <NotificationSystem
          className='favorite__notification'
          notification={notification}
          dismissToaster={dismissToaster}
        />
        <LocalSpinner loaded={!isLoading}>
          <div className="favorite">
            <div className="favorite__header">
              <ul>
                <li
                  className={classnames({'active': !toggleFavorite})}
                  onClick={() => {
                    this.setState({ currentPage: 1 });
                    this.fetchProfiles("favorites");
                  }}
                >
                  My Favorites
                </li>
                <li
                  className={classnames({'active': toggleFavorite})}
                  onClick={() => {
                    this.setState({ currentPage: 1 });
                    this.fetchProfiles("viewers")
                  }}
                >
                  Who's Viewed Me
                </li>
              </ul>
            </div>
            <div className="favorite__list">
              {toggleFavorite?
                this.renderViewerProfiles(viewers):
                this.renderFavoriteProfiles(favorites)
              }
            </div>
            { !isLoading && <Pagination
              current={currentPage}
              total={totalPage}
              onNext={() => {
                this.onSelectPage(Math.min(currentPage + 1, totalPage));
              }}
              onPrev={() => {
                this.onSelectPage(Math.max(1, currentPage - 1));
              }}
            /> }
          </div>
        </LocalSpinner>
      </div>
    );
  }
}

ViewersFavoriteHub.propTypes = {
  favorties: PropTypes.array,
  viewers: PropTypes.array,
  notification: PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.string,
  }),
  dismissToaster: PropTypes.func,
  setComponentLoadingRequest: PropTypes.func,
  deleteFavoriteProfileRequest: PropTypes.func,
  fetchProfileRequest: PropTypes.func,
};

const mapStateToProps = (state) => {
  return createStructuredSelector({
    favorites: viewersFavoriteSelectors.selectFavoriteProfiles(),
    viewers: viewersFavoriteSelectors.selectViewerProfiles(),
    isLoading: helperSelectors.isLoadingSelector(),
    notification: helperSelectors.selectNotification()
  });
}

const mapDispatchToProps = {
  fetchProfileRequest: viewersFavoriteActions.fetchProfileRequest,
  deleteFavoriteProfileRequest: viewersFavoriteActions.deleteFavoriteProfileRequest,
  setComponentLoadingRequest: helperActions.setComponentLoadingRequest,
  dismissToaster: helperActions.dismissToaster,
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewersFavoriteHub);
