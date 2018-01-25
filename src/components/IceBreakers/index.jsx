
import React from 'react';
import { connect } from 'react-redux';
import { compose, withState, withHandlers, lifecycle } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { asyncSelectors } from '../../selectors/index';
import { SEND_ICE_BREAKER } from '../../actions/types';
import { sendIceBreaker } from '../../actions/memberProfileActions'

import {
  ArrowHeart,
  Balloon,
  BeatingHeart,
  Bouquet,
  Heart,
  HeartEyes,
  Kiss,
  MessageHeart,
  PinkFlower,
  RedFlower,
  Smile,
  SunFlower,
  TwoHearts,
  Unicorn,
  YellowFlower,
} from '../../static/images/icebreakers';

const ICEBREAKERS = [
  { icon: Smile, text: 'smile' },
  { icon: Kiss, text: 'kiss' },
  { icon: HeartEyes, text: 'hearteyes' },
  { icon: Balloon, text: 'balloon' },
  { icon: Unicorn, text: 'unicorn' },
  { icon: SunFlower, text: 'sunflower' },
  { icon: YellowFlower, text: 'yellowflower' },
  { icon: RedFlower, text: 'redflower' },
  { icon: PinkFlower, text: 'pinkflower' },
  { icon: Bouquet, text: 'bouquet' },
  { icon: Heart, text: 'heart' },
  { icon: ArrowHeart, text: 'arrowheart' },
  { icon: TwoHearts, text: 'twohearts' },
  { icon: BeatingHeart, text: 'beatingheart' },
  { icon: MessageHeart, text: 'messageheart' },
];

const enhance = compose(
  connect(state => createStructuredSelector({
    statuses: asyncSelectors.statusesSelector(),
  }), {
    sendIceBreaker
  }),
  withState('selected', 'setSelected', null),
  withHandlers({
    handleSend: props => () => {
      if (props.selected) props.sendIceBreaker(props.user, props.selected.text);
    }
  }),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      if (this.props.statuses[SEND_ICE_BREAKER] === 'pending'
        && nextProps.statuses[SEND_ICE_BREAKER] === 'success') {
        if (this.props.doClose) { this.props.doClose(); }
      }
    }
  })
);

export default enhance(({
  user, selected, setSelected, doClose, handleSend, statuses
}) => (
  <div className="icebreakers-container">
    <div className="title">Send an icebreaker to {user.user_name}</div>
    <div className="icons">
      { ICEBREAKERS.map((ib, key) => (
        <div
          className="ibicon"
          onClick={()=> setSelected(ib)}
          key={ key }
        >
          <img src={ ib.icon } alt={ ib.text } />
        </div>
      )) }
    </div>
    <div className="actions">
      <div className="action-cancel" onClick={doClose}>Cancel</div>
      { statuses[SEND_ICE_BREAKER] === 'pending'
        ? <div className="action-send">Sending...</div>
        : <div className="action-send" onClick={handleSend}>Send to {user.user_name}
          {
            selected
            ? <img src={selected.icon} alt={selected.text} />
            : ''
          }
        </div>
      }
    </div>
  </div>
))
