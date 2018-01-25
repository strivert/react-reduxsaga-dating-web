import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageModalSlider from 'react-modal';
import cn from 'classnames';
import SendMessage from '../ProfileMessage';
import MessageModal from '../Modal';

import BlurredPhoto from '../BlurredPhoto';
import defaultPhoto from '../../uploads/default.jpg'

class ImageSlider extends Component {
	state = {
		activeSlide: 0,
		isImageSliderOpen: false,
		isMessageModalOpen: false
	};

	componentWillReceiveProps (nextProps) {
		if (this.props.isSending && !nextProps.isSending) {
			this.setState({
				isMessageModalOpen: false
			})
		}
	}

	toggleImageSliderOpen = () => this.setState(({isImageSliderOpen}) => ({isImageSliderOpen: !isImageSliderOpen}));
	toggleMessageModal = () => this.setState(({isMessageModalOpen}) => ({isMessageModalOpen: !isMessageModalOpen}));

	showNewSlide = (direction) => {
		return () => {
			const { images } = this.props;
			const { activeSlide } = this.state
			let newSlideIdx = direction === 'next' ? activeSlide + 1: activeSlide - 1;

			if (direction === 'previous' && newSlideIdx === -1) {
				newSlideIdx = images.length - 1;
			}

			newSlideIdx = (newSlideIdx) % images.length;

			this.setState({ activeSlide: newSlideIdx});
		}
	}

	renderSlides() {
		const { images } = this.props;
		const { activeSlide } = this.state;

		return images.map((image, index) => (
			<div
				className={ cn('non-stretching-img', { 'active-slide': index === activeSlide }) }
				key={index}
				onClick={this.toggleImageSliderOpen}
			>
				<BlurredPhoto
					url={image.large_url}
					fallbackUrl={defaultPhoto}
				/>
			</div>
		));
	}

	renderRotator() {
		const { images } = this.props;
		const { activeSlide } = this.state;

		return images.map((_, index) => {
			return (
				<div
					key={index}
					className={`rotator__disc ${ index === activeSlide ? 'active-disc': null}`}
				></div>
			);
		})
	}

	renderImageSlider() {
    const { images } = this.props
    const showArrows = images.length > 1

		return(
			<div className="slider">
				{this.renderSlides()}
				<div className="slider__navigation">
          { showArrows &&
            <div
              onClick={this.showNewSlide('previous')}
              className="ti-arrow-left arrow"
            />
          }
          { showArrows &&
            <div
              onClick={this.showNewSlide('next')}
              className="ti-arrow-right arrow"
            />
          }
					<div className="rotator">
						{this.renderRotator()}
					</div>
				</div>
        <div className="slider__caption" />
			</div>
		)
	}

	render() {
		const { user, member } = this.props;
		const { isImageSliderOpen, isMessageModalOpen } = this.state;

		return (
			<div className="slider-wrapper">
				{this.renderImageSlider()}
				<div className="slider__info">
					<h2>{user.username}</h2>
					<p>{user.age} • {user.location}</p>
				</div>
				{isImageSliderOpen &&
					<ImageModalSlider
						isOpen={isImageSliderOpen}
						onRequestClose={this.toggleImageSliderOpen}
						className='slider__base'
						overlayClassName='slider__overlay'
					>
					<button className="slider__close" onClick={this.toggleImageSliderOpen}>
						<i className="fa ti-close"></i>
					</button>
					{this.renderImageSlider()}
					<button onClick={this.toggleMessageModal} className="slider__smile-action round-btn">
						<i className="fa ti-comment-alt"></i>
					</button>
					<MessageModal 
						isOpen={isMessageModalOpen}
						onClose={this.toggleMessageModal}
						bgColor="#F8FBFE"
						>
						<SendMessage to={member} />
					</MessageModal>
				</ImageModalSlider>}
			</div>
		);
	}
}

ImageSlider.propTypes = {
	images: PropTypes.array.isRequired,
	user: PropTypes.object.isRequired
}

export default ImageSlider;
