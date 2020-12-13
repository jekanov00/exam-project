import { createSelector } from 'reselect';

export const authSelector = state => state.auth;

export const userSelector = createSelector(authSelector, auth => auth.user);
