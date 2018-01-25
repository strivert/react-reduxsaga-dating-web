import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CommentList from './CommentList';
import CommentForm from './CommentForm';

class CommentBox extends Component {
  state = {
    renderAll: false
  }

  handleLoadMore = () => {
    this.setState(prevState => ({
      renderAll: !prevState.renderAll
    }));
  }

  handleOnSubmit = (e, comment) => {
    e.preventDefault();
    const {activityId} = this.props;
    this.props.postCommentRequest(activityId, comment);
  }

  render() {
    const {likes_count, comments, avatar} = this.props;
    const {renderAll} = this.state;

    // TODO: Make this look descriptive like FB;
    // const likesCountText = likes_count ? `${likes_count}`: null;
    
    return(
      <div className="commentbox">
        <div className="commentbox__love__count">
          {likes_count ? <span><i className="fa fa-heart"></i>{likes_count}</span>: null}
        </div>
        <CommentList 
          comments={comments}
          renderAll={renderAll}
          onLoadMore={this.handleLoadMore}
        />
        <CommentForm
          renderAll={renderAll}
          onSubmit={this.handleOnSubmit}
          avatar={avatar}
        />
      </div>
    )
  }
}

CommentBox.propTypes = {
  likes_count: PropTypes.number,
  comments: PropTypes.arrayOf(PropTypes.shape({
    profile: PropTypes.shape({
      primary_photo: PropTypes.shape({
        small_url: PropTypes.string
      }),
      user_id: PropTypes.number,
      user_name: PropTypes.string,
    }),
    created_at: PropTypes.string.isRequired
  })),
  avatar: PropTypes.string,
  postCommentRequest: PropTypes.func.isRequired
}

export default CommentBox;
