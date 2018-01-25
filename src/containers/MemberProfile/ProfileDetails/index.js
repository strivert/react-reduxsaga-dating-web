import React from 'react';
import PropTypes from 'prop-types';

import donationIcon from '../../../static/images/donation.svg';
import bibleIcon from '../../../static/images/bible.svg';
import prayingIcon from '../../../static/images/praying.svg';

const ProfileDetails = ({member}) => {
		return (
			<div className="content-wrapper">
				<div className="profile__details">
					<section className="profile__details__more">
						{
							(member.religious_experience || member.catholicity ||
							member.marry_church || member.pray || member.attendance) &&
							<article className="catholic-details">
								<div className="section-icon">
									<img src={bibleIcon} alt=""/>
								</div>
								<div className="section-content">
									<h3 className="section-title">My Catholic Life</h3>
									{ member.religious_experience && <div className="big-screens-only">
										<span className="subtitle">How religion plays a role in my daily life</span>
										<p>{member.religious_experience}</p>
									</div> }
									{ member.catholicity && <p>Religion: <span>{member.catholicity}</span></p> }
									{ member.marry_church && <p>Can I marry in the church: <span>{member.marry_church}</span></p> }
									{ member.pray && <p>How often I pray: <span>{member.pray}</span></p> }
									{ member.attendance && <p>How often I attend church: <span>{member.attendance}</span></p> }
								</div>
							</article>
						}

						{
							(member.essay_about_me || member.essay_looking_for || member.essay_first_date ||
							member.birth_order || member.movies || member.music || member.hobbies || member.foods || member.books) &&
							<article className="about-me">
								<div className="section-icon">
									<img src={donationIcon} alt=""/>
								</div>
								<div className="section-content">
									<h3>Who I Am</h3>
									<div className="big-screens-only">
										{ member.essay_about_me && <div>
											<span className="subtitle">About Me</span>
											<p>{member.essay_about_me}</p>
										</div> }
										{ member.essay_looking_for && <div>
											<span className="subtitle">What am I looking for</span>
											<p>{member.essay_looking_for}</p>
										</div> }
										{ member.essay_first_date && <div>
											<span className="subtitle">My ideal first date might be</span>
											<p>{member.essay_first_date}</p>
										</div> }
									</div>
									<span className="subtitle">Short answers</span>
									{ member.birth_order && <p>In my family, I am: <span>{member.birth_order}</span></p> }
									<p>My Primary Interest: <span>Dating</span></p>
									{ member.movies && <p>Favorite Movies: <span>{member.movies}</span></p> }
									{ member.music && <p>Favorite Music: <span>{member.music}</span></p> }
									{ member.hobbies && <p>My Main Hobby: <span>{member.hobbies}</span></p> }
									{ member.foods && <p>Favorite Foods: <span>{member.foods}</span></p> }
									{ member.books && <p>Favorite Books: <span>{member.books}</span></p> }
								</div>
							</article>
						}

						{
							(member.living_situation || member.politics || member.date_with_children ||
							member.drink || member.driving_distance || member.planning || member.raised_in ||
							member.children || member.want_children || member.smoke || member.crisis ||
							member.tendtobe || member.age_interested|| member.money || member.hobbies ||
							member.highschool || member.college || member.difficult_situation || member.money ) &&
							<article className="about-me-more">
								<div className="section-icon">
									<img src={prayingIcon} alt=""/>
								</div>
								<div className="section-content">
									<h3>More About Me</h3>
									<span className="subtitle">Questions Asked About Me</span>
									{ member.living_situation && <p>Living Situation: <span>{member.living_situation}</span></p> }
									{ member.politics && <p>Politically, I consider myself: <span>{member.politics}</span></p> }
									{ member.date_with_children && <p>Would I date someone with children: <span>{member.date_with_children}</span></p> }
									{ member.drink && <p>Do I drink: <span>{member.drink}</span></p> }
									{ member.driving_distance && <p>To meet someone, I am willing to travel: <span>{member.driving_distance}</span></p> }
									{ member.planning && <p>When planning things: <span>{member.planning}</span></p> }
									{ member.difficult_situation && <p>When confronted with a difficult situation: <span>{member.difficult_situation}</span></p> }
									<p>My Primary Interest: <span>Dating</span></p>
									{ member.college && <p>Name of College: <span>{member.college}</span></p> }
									{ member.raised_in && <p>I was raised in a: <span>{member.raised_in}</span></p> }
									{ member.children && <p>Do I have children: <span>{member.children}</span></p> }
									{ member.want_children && <p>Do I want children once married: <span>{member.want_children}</span></p> }
									{ member.smoke && <p>Do I smoke: <span>{member.smoke}</span></p> }
									{ member.crisis && <p>When dealing with a crisis I am: <span>{member.crisis}</span></p> }
									{ member.tendtobe && <p>I tend to be: <span>{member.tendtobe}</span></p> }
									{ member.money && <p>To me money is something to: <span>{member.money}</span></p> }
									{ member.hobbies && <p>My Main Hobby: <span>{member.hobbies}</span></p> }
									{ member.highschool && <p>Name of High School: <span>{member.highschool}</span></p> }
									{ member.age_interested && <p>Age Interested: <span>{member.age_interested}</span></p> }
								</div>
							</article>
						}
					</section>
				</div>
			</div>
		);
};

ProfileDetails.propTypes = {
	member: PropTypes.object.isRequired
}

export default ProfileDetails;