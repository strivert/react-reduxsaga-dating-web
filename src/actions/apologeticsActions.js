import {
  FETCH_APOLOGETICS_REQUEST,
  SET_APOLOGETICS
} from './types';

/**
 * Generate an action that instructs the saga middleware to initiate an action
 * to fetch the list of message threads the currently logged in user is involved in
 */
export const fetchApologeticsRequest = (page) => ({type: FETCH_APOLOGETICS_REQUEST, payload: {
  page: page || 1
}});

export const setApologetics = (apologetics) => ({type: SET_APOLOGETICS, apologetics})
