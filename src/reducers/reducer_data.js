import { FETCH_SITE_DATA } from '../actions/index';

const INITIAL_STATE = { videos: {}, loading: true };

export default function(state = INITIAL_STATE, action) {
  console.log('action ', action);
  switch(action.type) {
    case FETCH_SITE_DATA:
      return { ...state, videos: action.payload.data, loading: false };
    default:
      return state;
  }
}
