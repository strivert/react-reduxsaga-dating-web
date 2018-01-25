import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import defaultAvatar from '../../../src/uploads/default.jpg';


const CommentItem = ({comment, children}) => {
  const avatar = comment.profile.primary_photo ? comment.profile.primary_photo.small_url : defaultAvatar

  return(
    <div className="commentbox__item">
      <img className="commentbox__avatar" src={avatar} alt={comment.profile.user_name}/>
      <div className="commentbox__body">
        <Link to={`/profiles/${comment.profile.user_id}`} className="username">{comment.profile.user_name || 'Anonymous'}</Link>
        <span>{ children }</span>
        <p className="commentbox__time-stamp">{moment(new Date(comment.created_at), 'YYYYMMDD').fromNowOrNow()}</p>
      </div>
      <hr />
    </div>
  )
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
    profile: PropTypes.shape({
      primary_photo: PropTypes.shape({
        small_url: PropTypes.string
      }),
      user_id: PropTypes.number,
      user_name: PropTypes.string,
    }),
    created_at: PropTypes.string.isRequired
  }),
  children: PropTypes.string.isRequired,
}

export default CommentItem;
