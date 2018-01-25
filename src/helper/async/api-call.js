/* eslint-disable func-names */
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';

import * as async from '../async';

export default ({
  type,
  method,
  path,
  onSuccess,
  onFailure,
  success,
  failure,
}) => function* (action) {
  try {
    yield async.reportPending(type);

    const res = yield call(
      method,
      typeof path === 'function' ? path(action) : path,
      action.payload,
    );

    if (onSuccess) {
      onSuccess(res, action);
    }

    yield put({
      type: async.success(type),
      payload: success ? success(res, action) : res,
    });

    yield async.reportSuccess(type);
    yield async.reportError(type, undefined); // clear errors
  } catch (err) {
    const errRes = get(err, 'response', err);
    if (onFailure) {
      onFailure(errRes);
    }

    const errPayload = failure ? failure(errRes) : errRes;

    yield put({
      type: async.failure(type),
      payload: errPayload,
    });

    yield async.reportError(type, errPayload);
    yield async.reportFailure(type);
  }
};
