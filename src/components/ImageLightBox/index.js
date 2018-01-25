import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-image-lightbox';


class ImageLightBox extends Component {
  state = {
    isOpen: false
  }

  render() {
    const { photoIndex, images, onCloseRequest } = this.props;
    
    return (<Lightbox
      mainSrc={images[photoIndex]}
      nextSrc={images[(photoIndex + 1) % images.length]}
      prevSrc={images[(photoIndex + images.length - 1) % images.length]}
      onCloseRequest={onCloseRequest}
      onMovePrevRequest={() => this.setState({photoIndex: (photoIndex + images.length - 1) % images.length})}
      onMoveNextRequest={() => this.setState({photoIndex: (photoIndex + 1) % images.length })}
    />)
  }
}

ImageLightBox.propTypes = {
  images: PropTypes.array.isRequired,
  photoIndex: PropTypes.number.isRequired
}

export default ImageLightBox;