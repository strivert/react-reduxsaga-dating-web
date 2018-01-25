import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const InteractionsBox = ({likeId, activityId, activityLike}) => (
	<div className="interactions__box">
		<div className="interactions__box__heart">
			<div className={classnames(likeId? "fa fa-heart": "fa fa-heart-o")}
				onClick={() => activityLike({likeId, activityId})}>
			</div>
		</div>
	</div>
);

InteractionsBox.propTypes = {
	likeId: PropTypes.number,
	activityLike: PropTypes.func.isRequired,
	activityId: PropTypes.number.isRequired
}

export default InteractionsBox;