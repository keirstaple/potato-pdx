import { createSelector } from 'reselect';

export const appState = state =>  state.app;
export const routeState = state => state.routing;

// export const appData = createSelector(
//   appState,
//   ({ data }) => data,
// );

export const videoData = createSelector(
  appState,
  ({ videos }) => videos.data
)

export const locationBeforeTransitions = createSelector(
  routeState,
  ({ locationBeforeTransitions }) => locationBeforeTransitions,
);

export const pathName = createSelector(
  locationBeforeTransitions,
  ({ pathname }) => pathname,
);

export const videoId = createSelector(
  pathName,
  p => p.split('/')[2],
)
