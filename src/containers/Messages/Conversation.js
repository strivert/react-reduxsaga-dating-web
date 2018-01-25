import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import moment from 'moment'
import classnames from 'classnames';
import sanitizeHtml from 'sanitize-html';
import Spinner from 'react-spinkit';

import Member from '../../components/Member';


import defaultAvatar from '../../uploads/default.jpg';

class Conversation extends Component {

	state = {
		sending: false,
		clickedViewMoreMsgs: false
	}

	componentDidMount() {
		// this.scrollToBottom()
	}

	componentDidUpdate() {
		// this.scrollToBottom()
	}

	scrollToReply() {
		const node = ReactDOM.findDOMNode(this.convBox);
		node.scrollTop = node.scrollHeight;
		window.scrollTo(0, node.offsetTop);
	}

	viewMore() {
		this.setState({
			clickedViewMoreMsgs: true
		});
	}

	handleOnSubmit(e, recipient) {
		e.preventDefault();
		const { postMessageRequest, setSendingMessage } = this.props;
		setSendingMessage(true);
		const body = this.body.value;

		if (body && body !== '') {
			const message = {
				message: {
					'recipient_user_name': recipient.user_name,
					'recipient_user_id': recipient.user_id,
					'body': body
				}
			};

			postMessageRequest(message);
			this.body.value = '';
		}
	}

  renderMessageBody(message) {
    if(message.meta && message.meta.icebreaker) {
      return (
        <img src={message.meta.icebreaker_graphic} alt={message.icebreaker} />
      )
    }
    else {
      return (
        <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(message.body)}}></p>
      )
    }
  }

	renderMessages() {
		const { messages } = this.props;

		return messages.map((message, index) => {
			const { sender, sent_at } = message;
			const avatar = sender.primary_photo ? sender.primary_photo.small_url: defaultAvatar;

			return (
				<div key={`${message.id}-${index}`}
				     className="conversation__message"
				>

					<span className="message-date">{moment(sent_at).format("MM/DD/YYYY")}</span>
					<div className="message">
						<img
							src={avatar}
							className="user-avatar"
							alt="User Avatar"
						/>
						<div className="user-message">
              { this.renderMessageBody(message) }
						</div>
					</div>
				</div>
			);
		});
	}

	render() {
		const { thread, isSending, isLoading, isMobile, deleteMessageThreadRequest } = this.props;
		const { clickedViewMoreMsgs } = this.state;

		const limitCount = 15;

		const allMsgs = this.renderMessages();
		const defaultMsgs = allMsgs.slice(0, limitCount);
		const remainsMsgs = allMsgs.slice(limitCount, allMsgs.length);

		if (!thread)
			return null;

		return (
			<div
				className={classnames("messages__conversation", {"disable-scroll": isLoading}, {"is-mobile": isMobile})}
				onClick={(e)=>{e.stopPropagation()}}
				 ref={(convBox) => this.convBox = convBox}
			>
				{ (isLoading) &&
					<div className="message-overlay">
						<Spinner name="ball-spin-fade-loader" />
					</div>
				}
				<div className="conversation__messages">
					<Member member={thread.partner} />
					<div className="conversation__actions">
						<i className="actions__delete" onClick={() => {
							deleteMessageThreadRequest(thread.id);
						}}></i>
						<i className="actions__reply" onClick={() => this.scrollToReply()}></i>
					</div>
					{defaultMsgs}
					{
						(!clickedViewMoreMsgs && remainsMsgs.length > 0)  &&
							<div onClick={() => this.viewMore()} className="view__more">
								View more messages
							</div>
					}
					{clickedViewMoreMsgs && remainsMsgs}
				</div>
			
			
				<div className="conversation__send">
					<form onSubmit={(e) => this.handleOnSubmit(e, thread.partner)}>
						<i
							onClick={event => this.fileInput.click()}
							className="message-upload-btn"
						></i>
						<input
							ref={input => this.fileInput = input}
							type="file" style={{display: 'none'}}
						/>
						<textarea
							ref={input => this.body = input}
							placeholder={`Reply to ${thread.partner.user_name}`}
						>
						</textarea>
						<input
							className={classnames({'disabled': isSending})}
							disabled={isSending} type="submit"
							value={isSending ? 'Sending...': 'Send'}
						/>
					</form>
				</div>
			</div>
		)
	}
}

Conversation.propTypes = {
	thread: PropTypes.object,
	messages: PropTypes.array.isRequired,
	postMessageRequest: PropTypes.func.isRequired,
	deleteMessageThreadRequest: PropTypes.func,
	isSending: PropTypes.bool.isRequired,
	isLoading: PropTypes.bool.isRequired
}

export default Conversation;
