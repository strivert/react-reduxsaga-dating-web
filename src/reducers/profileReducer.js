import { 
  TOGGLE_GALLERY,
  FETCH_PROFILES_FAILURE, 
  FETCH_PROFILES_SUCCESS,
  SET_PROFILES_EMPTY
   } from '../actions/types';
import { fromJS, List } from 'immutable';

const initialState = fromJS({
  toggle: false,
});

export default (state=initialState, action) => {
  switch(action.type) {
    case TOGGLE_GALLERY:
      let toggle = !state.get('toggle');
      return state.set('toggle', toggle);
    case FETCH_PROFILES_SUCCESS:
      let newState = state.mergeIn(['meta'], action.profiles.meta);
      action.profiles.profiles.map((item, index)=>{
        newState = newState.updateIn(['profiles'], List(), list => list.push(item)); 
        return true;
      });
      return newState;
    case FETCH_PROFILES_FAILURE:
      return state.set('nofication', fromJS({type: 'failure', message: action.message}));
    case SET_PROFILES_EMPTY:
      return state.setIn(['meta'], fromJS({})).setIn(['profiles'], fromJS([]));
    default:
      return state;
  }
}

