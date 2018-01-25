import { createSelector } from 'reselect';

const selectApologetics = state => state.getIn(['apologetics', 'apologetics']);
const selectHasMoreApologetics = state => state.getIn(['apologetics', 'hasMoreApologetics']);

export const apologeticsSelector = () => createSelector(
  selectApologetics,
  (apologetics) => apologetics.toJS()
);

export const hasMoreApologeticsSelector = () => createSelector(
  selectHasMoreApologetics,
  (hasMore) => hasMore
)
