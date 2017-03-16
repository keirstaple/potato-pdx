import { vimeoApi } from '../../api';

const INIT_APP                 = 'INIT_APP';
const FETCH_VIMEO_DATA         = 'FETCH_VIMEO_DATA';
const FETCH_VIMEO_DATA_SUCCESS = 'FETCH_VIMEO_DATA_SUCCESS';
const FETCH_VIMEO_DATA_FAILURE = 'FETCH_VIMEO_DATA_FAILURE';

export const INITIAL_STATE = { videos: {}, isFetching: false, appInitialized: false };

export const initializeApp = () => ({ type: INIT_APP });

//vimeo actions
export const getVideos = payload => ({ type: FETCH_VIMEO_DATA, payload });
export const getVideosSuccess = payload => ({ type: FETCH_VIMEO_DATA_SUCCESS, payload });
export const getVideosFailure = payload => ({ type: FETCH_VIMEO_DATA_FAILURE, payload });

//thunks
export const getVideosThunk = () => dispatch => {
  console.log('getvideosthunk')
  dispatch(getVideos());
  return vimeoApi.fetchData().then(
    data => dispatch(getVideosSuccess(data)),
    err => dispatch(getVideosFailure(err)),
  )
}

const reducer = (state = INITIAL_STATE, action) => {
  console.log('reducer')
  switch(action.type) {
    case INIT_APP:
      return {
        ...state,
        appInitialized: true
      };
    case FETCH_VIMEO_DATA:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_VIMEO_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        videos: action.payload
      }
    case FETCH_VIMEO_DATA_FAILURE:
      return {
          ...state,
          isFetching: false,
          error: action.error
      };
    default:
      return state;
  }
}

export default reducer;
