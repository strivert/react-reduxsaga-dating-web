import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Spinner from 'react-spinkit';

import {
	memberProfilePicturesActions,
	helperActions
} from '../../actions';
import {
	memberProfilePicturesSelectors,
	helperSelectors
} from '../../selectors';

import defaultAvatar from '../../static/images/onboarding/oval-2.png';
import PngPhotoUpload from '../../static/images/onboarding/camera.png';

class MainProfilePictureUploader extends Component {
	state = {
		previewUrls: [],
		mainProfilePicture: null,
		error: null,
		selectedIndex: null
	};

	constructor(props) {
		super(props);
		this.fileInputs = [];
	}

	validFileType(file) {
		if (file && ['image/jpeg', 'image/png', 'image/gif'].indexOf(file.type) === -1) {
			return false;
		}
		return true;
	}

	convertFileToDataURLviaFileReader(url, callback) {
		let xhr = new XMLHttpRequest();
	  	xhr.onload = function() {
		    let reader = new FileReader();
		    reader.onloadend = function() {
	    		callback(reader.result);
	    	}
	    	reader.readAsDataURL(xhr.response);
	  	};
	  	xhr.open('GET', url);
	  	xhr.responseType = 'blob';
	  	xhr.send();
	}

	handleMainSelect(event, picId) {
		const { files } = event.target

		if (!this.validFileType(files[0])) {
			this.setState({
				error: 'You are only allowed to upload images (types: .jpg, .png, .gif, .svg)'
			});
			return;
		}

		if (files[0]) {
			this.setState({
				mainProfilePicture: URL.createObjectURL(files[0]),
				error: null,
				selectedIndex: null
			});

			const data = new FormData()
			this.convertFileToDataURLviaFileReader(URL.createObjectURL(files[0]), (b64) => {
				data.append('photo[data]', b64);
				data.append('photo[primary]', true);
				this.props.uploadProfilePictureRequest(data, picId);
			});
		}
	}

	renderMainProfilePictureUploader() {
		const { mainProfilePicture, selectedIndex } = this.state;
		const { mainPicture, isLoading } = this.props;

		let avatar = defaultAvatar;
		let mainPicId = null;
		if (mainPicture && mainPicture.medium_url.startsWith('https://')) {
			avatar = mainPicture.large_url;
			mainPicId = mainPicture.id;
		}
		avatar = mainProfilePicture ? mainProfilePicture: avatar;

		return (
      <div className="box-option small-image">
        <div className="oval" style={{backgroundImage: `url(${avatar})`}}>
            <img
              src={PngPhotoUpload} alt="Camera"
              onClick={() => {
    						if (!isLoading) {
    							this.mainPictureInput.click()
    						}
    					}}
             />
        </div>
        <input
					onChange={(event)=>this.handleMainSelect(event, mainPicId)}
					ref={input => this.mainPictureInput = input}
					type="file" style={{display: 'none'}}
				/>
				{(isLoading && selectedIndex === null) && <Spinner name="ball-spin-fade-loader" />}
      </div>
		);
	}

	render() {
		const { error } = this.state;
		const { goNext, goPrev, currentPath, mainPicture } = this.props;
		return (
      <div className="onboarding onboarding__upload__photo">
        <h1>Upload a Photo of Yourself</h1>

        <div className="box-options center">
					{this.renderMainProfilePictureUploader()}
        </div>
        { error &&
					<div className="error">
						{error}
					</div>
				}
				{ !mainPicture &&
					<p onClick={() => goNext('photo', null, currentPath)}>or, continue without adding a photo</p>
				}
				{ mainPicture &&
					<p onClick={() => goNext(null, null, currentPath)}>Continue</p>
				}
        <div className="action-footer">
          <a className="prev-link" onClick={() => goPrev()}>&lt; Go Back to Change Previous Answer</a>
        </div>
      </div>
		);
	}
}

const mapStateToProps = () => {
	return createStructuredSelector({
		mainPicture: memberProfilePicturesSelectors.currentUserMainProfilePictureSelector(),
		isLoading: helperSelectors.isLoadingSelector(),
		userPictures: memberProfilePicturesSelectors.currentUserProfilePictureSelector()
	});
};

const mapDispatchToProps = {
	uploadProfilePictureRequest: memberProfilePicturesActions.uploadProfilePictureRequest,
	setComponentLoadingRequest: helperActions.setComponentLoadingRequest,
	setComponentLoading: helperActions.setComponentLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(MainProfilePictureUploader);
