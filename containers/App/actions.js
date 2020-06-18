/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import Sentry from '../../services/sentry';

import { ERROR, LOADED } from './constants';

/**
 * Dispatched when fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ERROR passing the error
 */
export default function error(err) {
	Sentry.captureMessage(err);
	return {
		type: ERROR,
		err,
	};
}

export function ready() {
	return {
		type: LOADED,
	};
}
