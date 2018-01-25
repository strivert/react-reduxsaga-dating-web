import React from 'react';
import PropTypes from 'prop-types';

import StarRating from '../../../components/StarRating';
import starIcon from '../../../static/images/blue-star.svg';
import largeStarRating from '../../../static/images/large-pink-stars.svg';


const PersonalityResultDetail = ({personalityTestResult}) => {
		const stars = [];
		Object.keys(personalityTestResult).forEach((key, idx) => {
			if(key !== 'total_score') {
				stars.push(
				<div className="star__rating" key={idx}>
					<StarRating
						rating={Math.ceil((personalityTestResult[key]/100) * 5)}
					/> 
					<span>{key}</span>
				</div>
				)
			}
		});
		return (
			<div className="content-wrapper">
				<div className="profile__details">
					<section className="personality__details">
							<article className="personality-results">
								<div className="section-icon">
									<img src={starIcon} alt=""/>
								</div>
								<div className="section-content">
									<h3>Compatiblity</h3>
									<span className="subtitle">Overall Compatiblity</span>
									<div className="star__rating-large">
										<img src={largeStarRating} alt="" />
									</div>
									{stars}
								</div>
							</article>
					</section>
				</div>
			</div>
		);
};

PersonalityResultDetail.propTypes = {
	personalityTestResult: PropTypes.shape({
		agreeableness: PropTypes.number,
		openness: PropTypes.number,
		extroversion: PropTypes.number,
		conscientiousness: PropTypes.number,
		neuroticism: PropTypes.number,
		religiosity: PropTypes.number,
		levelofcommitment: PropTypes.number,
		total_score: PropTypes.number,
	}).isRequired
}

export default PersonalityResultDetail;