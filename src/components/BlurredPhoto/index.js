import React, { Component } from "react";
import PropTypes from 'prop-types';

class BlurredPhoto extends Component {
  renderBlurredPhoto() {
    const { url } = this.props;

    return (
      <div className="blurredphoto">
        <div className="blurredphoto__blurredbackground" style={{backgroundImage: `url(${url})`}} />
        <div className="blurredphoto__image" style={{backgroundImage: `url(${url})`}}>
          { this.props.children }
        </div>
      </div>
    );
  }

  renderFallbackPhoto() {
    const { fallbackUrl } = this.props;

    return (
      <div className="blurredphoto__fallback__wrapper">
        <div className="blurredphoto__fallback__image" style={{backgroundImage: `url(${fallbackUrl})`}}>
          { this.props.children }
        </div>
      </div>
    )
  }

  render() {
    return this.props.url ? this.renderBlurredPhoto() : this.renderFallbackPhoto();
  }
}

BlurredPhoto.propTypes = {
  url: PropTypes.string,
  fallbackUrl: PropTypes.string
};

export default BlurredPhoto;
