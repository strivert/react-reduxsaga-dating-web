
import { fromJS } from 'immutable';
import { STATUS, ERROR, RESET } from '../actions/types';

const initialState = fromJS({
  errors: {},
  statuses: {},
});

export default (state = initialState, action) => {
  switch (action.type) {
    case STATUS: {
      const { type, status } = action.payload;
      return state.update('statuses', statuses => statuses.set(type, status))
    }
    case ERROR: {
      const { type, status } = action.payload;
      return state.update('errors', errors => errors.set(type, status))
    }
    case RESET: {
      const { key } = action.payload;
      return state.update('errors', errors => errors.delete(key))
        .update('statuses', statuses => statuses.delete(key))
    }
    default:
      return state;
  }
};
