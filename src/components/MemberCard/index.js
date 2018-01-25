import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { helperActions } from '../../actions';

import defaultPhoto from '../../uploads/default.jpg';
import BlurredPhoto from '../BlurredPhoto'
import { formatViewedDate } from '../../utils';
import trashCanIcon from '../../static/images/trashcan.svg';
import ReactResizeDetector from 'react-resize-detector';

// TODO: I probably shouldn't have hooked this component to redux so it needs a refactoring

class MemberCard extends React.Component {

  _onResize = () => {
    const el = ReactDOM.findDOMNode(this);
    el.style.height = `${el.clientWidth * 1.25}px`;
  }

  render() {
    const { member, className="", addTrash, lastViewed, removeFavorite, setComponentLoadingRequest } = this.props
    return (
      <Link
        to={`/profiles/${member.user_id}`}
        className="member__card"
        onClick={() => {
          setComponentLoadingRequest(true);
        }}
      >
        <div className={`member__card__body ${className}`}>
          <BlurredPhoto
            url={member.primary_photo && member.primary_photo.medium_url}
            fallbackUrl={defaultPhoto}
            >
            {lastViewed &&
              <span className="member__viewed__date">
                {member.last_viewed_by_at ? `VIEWED ${formatViewedDate(member.last_viewed_by_at)}`: null}
              </span>
            }
            {addTrash ? <span className="member__card__delete" onClick={removeFavorite}><img src={trashCanIcon} alt=""/></span> : null}
          </BlurredPhoto>
        </div>
        <div className="member__card__footer">
          <h3>{member.user_name}</h3>
          <p>{member.age} &bull; {member.location}</p>
        </div>
        <ReactResizeDetector handleWidth handleHeight onResize={this._onResize}/>
      </Link>
    );
  }
}

MemberCard.propTypes = {
  member: PropTypes.object.isRequired,
  addTrash: PropTypes.bool,
  removeFavorite: PropTypes.func
};

const actions = {
	setComponentLoadingRequest: helperActions.setComponentLoadingRequest
};

export default connect(null, actions)(MemberCard);
