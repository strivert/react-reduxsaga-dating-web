
import React from 'react';
import { connect } from 'react-redux';
import { compose, withState, withHandlers, lifecycle } from 'recompose';
import { createStructuredSelector } from 'reselect';
import cn from 'classnames';

import { reportUser } from '../../actions/memberProfileActions'
import { asyncSelectors } from '../../selectors';
import { REPORT_USER } from '../../actions/types';

const enhance = compose(
  connect(state => createStructuredSelector({
    statuses: asyncSelectors.statusesSelector(),
  }), {
    reportUser
  }),
  withState('reason', 'setReason', ''),
  withHandlers({
    handleSubmit: props => () => {
      if (props.reason !== '') {
        props.reportUser(props.user.id, props.reason);
      }
    }
  }),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      if (this.props.statuses[REPORT_USER] === 'pending' && nextProps.statuses[REPORT_USER] === 'success') {
        if (this.props.afterSubmit) {
          this.props.afterSubmit();
        }
      }
    }
  })
);

export default enhance(({
  handleSubmit,
  reason,
  setReason,
  user,
  statuses,
}) => (
  <div className="profile__report">
    <textarea
      className="form-control"
      placeholder={`Reason to report ${user.user_name}`}
      onChange={evt => setReason(evt.target.value)}
      value={reason}
    />
    <div className="text-right">
      <button
        className={cn("btn", { "btn--ghost": statuses[REPORT_USER] === 'pending' || reason.length === 0 })}
        onClick={handleSubmit}
        disabled={statuses[REPORT_USER] === 'pending' || reason.length === 0}
      >Send</button>
    </div>
  </div>
));
