import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

const CommentList = ({comments, renderAll, onLoadMore}) => {
  
  const commentCount = comments.length;
  const renderComments = () => {
    const sortedComments = comments.sort((a, b) => a.id - b.id);
    const fewerComments = (commentCount - 3) > 0? (commentCount - 3) : 0;
    const commentsToRender = renderAll? sortedComments: sortedComments.slice(fewerComments);
    
    return commentsToRender
      .map((comment, key) => {
        const {body, ...rest} = comment;
        return(
          <CommentItem key={key} comment={rest}>
            {body}
          </CommentItem>
        )
      });
  }

  const commentCountText = commentCount > 3 ? `View ${renderAll ? 'fewer comments': `${commentCount - 3} more comment${commentCount > 4? 's': ''}`}`: null;
  
  return(
    <div className="commentbox__list">
      <div 
        className="commentbox__more" 
        onClick={onLoadMore}>{commentCountText}
      </div>
      {renderComments()}
    </div>
  )
}

CommentList.propTypes = {
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
  renderAll: PropTypes.bool.isRequired,
  onLoadMore: PropTypes.func,
}

export default CommentList;
