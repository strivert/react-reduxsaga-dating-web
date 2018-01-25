
import React from 'react';
import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';
import { createStructuredSelector } from 'reselect';
import cn from 'classnames';

import { postMessageRequest, setSendingMessage } from '../../actions/messagesActions'
import { messagesSelectors } from '../../selectors';

const enhance = compose(
  connect(state => createStructuredSelector({
    isSending: messagesSelectors.isSendingMessageSelector(),
  }), {
    postMessageRequest,
    setSendingMessage
  }),
  withState('message', 'setMessage', ''),
  withHandlers({
    handleSubmit: props => () => {
      const { postMessageRequest, setSendingMessage, afterSubmit } = props;
      setSendingMessage(true);

      if (props.message !== '') {
        const message = {
          message: {
            'recipient_user_name': props.to.user_name,
            'recipient_user_id': props.to.user_id,
            'body': props.message
          }
        };

        postMessageRequest(message);
        if (afterSubmit) {
          afterSubmit();
        }
      }
    }
  })
);

export default enhance(({
  handleSubmit,
  message,
  setMessage,
  isSending,
  to
}) => (
  <div className="profile__message__send">
    <div className="wrapper">
      <div className="icon-camera">&nbsp;</div>
      <textarea
        className="form-control"
        placeholder={`Send a message to ${to.user_name}`}
        onChange={evt => setMessage(evt.target.value)}
        value={message}
      />
    </div>
    <div className="text-right">
      <button
        className={cn("btn", { "btn--ghost": isSending || message.length === 0 })}
        onClick={handleSubmit}
        disabled={isSending || message.length === 0}
      >Send</button>
    </div>
  </div>
));
