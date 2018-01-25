import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MediaQuery from 'react-responsive';
import Spinner from 'react-spinkit';

import {
	memberProfilePicturesActions,
	helperActions
} from '../../../../actions';
import {
	authSelectors,
	memberProfilePicturesSelectors,
	helperSelectors
} from '../../../../selectors';
import Pagination from '../../../../components/Pagination';

import defaultAvatar from '../../../../uploads/default.jpg';

const PER_MOBILE_PAGE = 6;

class PicturesManage extends Component {
	state = {
		pictures: [],
		previewUrls: [],
		mainProfilePicture: null,
		nextIndex: 0,
		error: null,
		selectedIndex: null,
		slotCurrentPage: 1,
		totalSlotPage: 1,
		userGeneralPictures: [],
		totalPage: 1
	};

	static get UPLOAD_BOXES_COUNT() {
		return 9;
	}

	constructor(props) {
		super(props);
		this.fileInputs = [];
	}

	componentDidMount() {
		const {userPictures} = this.props;
		this.setGeneralPicturesAndTotalPage(userPictures);
		
	}
	componentWillReceiveProps(nextProps) {
		const {userPictures} = nextProps;
		this.setGeneralPicturesAndTotalPage(userPictures);
	}

	setGeneralPicturesAndTotalPage(userPictures) {
		const userGeneralPictures = userPictures.filter((obj, index)=>{
			if (!obj.primary)
				return true;
			else
				return false;
		});

		userGeneralPictures.sort(function(a, b){
			return a.caption - b.caption
		});

		const totalPage = Math.ceil(userGeneralPictures.length / PicturesManage.UPLOAD_BOXES_COUNT);
		this.setState({
			userGeneralPictures: userGeneralPictures,
			totalPage: totalPage
		})
	}

	validFileType(file) {
		if (file && ['image/jpeg', 'image/png', 'image/gif'].indexOf(file.type) === -1) {
			return false;
		}
		return true;
	}

	handleFileSelect(event, picId, caption) {
		const {dataset, files} = event.target;
		const {pictures, previewUrls, slotCurrentPage} = this.state;
		const { userPictures } = this.props;

		let userCommonPictures = userPictures.filter((obj, index)=>{
			if (!obj.primary)
				return true;
			else
				return false;
		});
		
		let userLengthForPreview = userCommonPictures.length - PicturesManage.UPLOAD_BOXES_COUNT * (slotCurrentPage-1);
		let index = previewUrls.length > 0 ? previewUrls.length : userLengthForPreview;
		if (picId) {
			index = parseInt(dataset.index, 10);
		}

		if (!this.validFileType(files[0])) {
			this.setState({
				error: 'You are only allowed to upload images (types: .jpg, .png, .gif, .svg)'
			});
			return;
		}

		if(files[0]) {
			const pics = pictures.slice();
			const previews = previewUrls.slice();
			pics[index] = files[0];
			previews[index] = URL.createObjectURL(files[0]);

			this.setState({
				pictures: pics,
				previewUrls: previews,
				error: null,
				selectedIndex: index
			});

			const data = new FormData();
			this.convertFileToDataURLviaFileReader(URL.createObjectURL(files[0]), (b64) => {
				data.append('photo[data]', b64);
				if (picId) {
					data.append('photo[caption]', caption);
				} else {
					data.append('photo[caption]', new Date().getTime());
				}
				this.props.uploadProfilePictureRequest(data, picId, caption);
			});
		}
	}

	showNextSetOfUploadBoxes(direction) {
		const { nextIndex } = this.state;
		let next = direction === 'next' ? nextIndex + PER_MOBILE_PAGE: nextIndex - PER_MOBILE_PAGE;

		if (direction === 'previous' && next <= -1) {
			const difference = PicturesManage.UPLOAD_BOXES_COUNT % PER_MOBILE_PAGE;
			next = PicturesManage.UPLOAD_BOXES_COUNT - difference;
		} else if (direction === 'next' && next >= PicturesManage.UPLOAD_BOXES_COUNT) {
			next = 0;
		}

		this.setState({
			nextIndex: next
		});
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

	onSelectSlot (slotCurrentPage) {
		const { isLoading } = this.props;
		if ( isLoading ) {
			return;
		}
	    this.setState({
	      slotCurrentPage: slotCurrentPage,
	      previewUrls: []
	    });
	    // window.scrollTo(0, 0);
	}

	addSlot () {
		const { userGeneralPictures } = this.state;
		const { currentUser, userPictures } = this.props;
		if (currentUser.limited) {
			this.props.history.push('/account-upgrade');
			return;
		}

		const addCondition = (userPictures.length > 0 && (userPictures.length % PicturesManage.UPLOAD_BOXES_COUNT === 0) && userGeneralPictures.length === userPictures.length);
		if (!addCondition) {
			return;
		}

		let userGeneralPicturesTemp = userGeneralPictures.slice();
		
		for( let i=0; i<PicturesManage.UPLOAD_BOXES_COUNT; i++) {
			userGeneralPicturesTemp.push({});
		}

		const totalPage = Math.ceil(userGeneralPicturesTemp.length / PicturesManage.UPLOAD_BOXES_COUNT);

		this.setState({
			userGeneralPictures: userGeneralPicturesTemp,
			totalPage: totalPage,
			slotCurrentPage: totalPage,
			previewUrls: []
		});
		
	}

	renderUploadBoxes() {
		const { previewUrls, selectedIndex, slotCurrentPage, userGeneralPictures } = this.state;
		const { isLoading } = this.props;

		let pagedMembers = [];
	    if (userGeneralPictures && userGeneralPictures.length) {
	    	pagedMembers = userGeneralPictures.slice(
	        	Math.max(0, (slotCurrentPage - 1) * PicturesManage.UPLOAD_BOXES_COUNT),
	          	slotCurrentPage * PicturesManage.UPLOAD_BOXES_COUNT
	        );
	    }

		return [...Array(PicturesManage.UPLOAD_BOXES_COUNT).keys()].map(i => {
			if (!pagedMembers[i]) {
			}
			let plusClassName = "ti-pencil add-picture-btn";
			if ( !pagedMembers[i] && !previewUrls[i] ) {
				plusClassName = "ti-plus add-picture-btn";
			}

			const picId = (pagedMembers[i]) ? pagedMembers[i].id : null;
			const caption = (pagedMembers[i]) ? pagedMembers[i].caption : null;

			const avatarPiece = pagedMembers[i] ?
							(	previewUrls[i] ?
									previewUrls[i]
								:
									pagedMembers[i].small_url
							)
						:
							previewUrls[i];
			const pieceClassName = (!avatarPiece) ? "settings__pictures__card": "settings__pictures__card avatar";
			return (
				<div
					onClick={(event) => {
						if ( !isLoading) {
							this.fileInputs[i].click()
						}
					}}
					className={`${pieceClassName}`}
					key={i}
				>
					<div className={`${plusClassName}`}></div>
					<div className="settings__picture__main__blurredbackground" style={{backgroundImage: `url(${avatarPiece})`}}>
					</div>
					<div className="settings__picture__main__image" style={{backgroundImage: `url(${avatarPiece})`}}></div>
					<input
						onChange={(event)=>this.handleFileSelect(event, picId, caption)}
						ref={input => this.fileInputs[i] = input}
						data-index={i}
						type="file" style={{display: 'none'}}
					/>
					{(isLoading && selectedIndex === i) && <Spinner name="ball-spin-fade-loader" />}
				</div>
			);
		})
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
			<div className="settings__pictures__main">
				<div className="settings__picture__main__blurredbackground" style={{backgroundImage: `url(${avatar})`}}>
				</div>
				<div className="settings__picture__main__image" style={{backgroundImage: `url(${avatar})`}}></div>
				<i
					onClick={() => {
						if (!isLoading) {
							this.mainPictureInput.click()
						}
					}}
					className="edit-pencil btn-edit"
				></i>
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
		const { nextIndex, slotCurrentPage, error, totalPage } = this.state;

		return (
			<div className="settings__pictures">
				<div className="settings__pictures__header">
					<div className="settings__pictures__info">
						<h3>Add and Update Pictures</h3>
						<p>
							Please note: your main profile photo should be solely
							of yourself with no one else (or pets) in the photo
						</p>
					</div>
					<MediaQuery query="(min-width: 320px) and (max-width: 1024px)">
						
						{this.renderMainProfilePictureUploader()}
					</MediaQuery>
				</div>
				{ error &&
					<div className="error">
						{error}
					</div>
				}
				<div className="settings__pictures__body">
					<MediaQuery query="(min-width: 1025px)">
						{this.renderMainProfilePictureUploader()}
					</MediaQuery>
					<div className="settings__pictures__upload">
						<MediaQuery query="(min-width: 320px) and (max-width: 767px)">
							<span
								onClick={() => this.showNextSetOfUploadBoxes('previous')}
								className="ti-angle-left"
							></span>
							<span
								onClick={() => this.showNextSetOfUploadBoxes('next')}
								className="ti-angle-right"
							></span>
							<div className="settings__pictures__cards">
								{
									this.renderUploadBoxes().slice(nextIndex, PER_MOBILE_PAGE + nextIndex)
								}
							</div>
						</MediaQuery>
						<MediaQuery minDeviceWidth={768}>
							<div className="settings__pictures__cards">
								{
									this.renderUploadBoxes()
								}
							</div>
						</MediaQuery>

						<div className="add-more-photos" onClick={()=>{this.addSlot();}}>
							Add more pictures
						</div>

						<div className="pagination-center">
							<Pagination
								current={slotCurrentPage}
								total={totalPage}
								onNext={() => {
									this.onSelectSlot(Math.min(slotCurrentPage + 1, totalPage));
								}}
								onPrev={() => {
									this.onSelectSlot(Math.max(1, slotCurrentPage - 1));
								}}
							/>
						</div>
					</div>
					
				</div>
			</div>
		);
	}
}

const mapStateToProps = () => {
	return createStructuredSelector({
		currentUser: authSelectors.selectCurrentUser(),
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

export default connect(mapStateToProps, mapDispatchToProps)(PicturesManage);
