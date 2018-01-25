
import { put } from 'redux-saga/effects';
import { STATUS } from '../../actions/types';

export default (type, status) => put({
  type: STATUS,
  payload: { type, status }
});
