
import { put } from 'redux-saga/effects';
import success from './success';

export default (actionType, payload) => put({ type: success(actionType), payload });
