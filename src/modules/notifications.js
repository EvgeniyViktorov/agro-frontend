import { createReducer } from './../utils/modules';

export const NOTIFICATIONS_ADD = 'common/NOTIFICATIONS_ADD';
export const NOTIFICATIONS_REMOVE = 'common/NOTIFICATIONS_REMOVE';
export const MARK_NOTIFICATIONS_FOR_REMOVE_BY_UID = 'common/MARK_NOTIFICATIONS_FOR_REMOVE_BY_UID';

export const NOTIFICATIONS_INITIAL_STATE = {
	items: [],
};

export const ACTION_ADD = 'add';
export const ACTION_REMOVE = 'remove';

const initialState = {
	...NOTIFICATIONS_INITIAL_STATE,
};

export default createReducer(initialState, {
	[NOTIFICATIONS_ADD]: (state, { data }) => ({
		items: [
			...state.items,
			...(data.map(it => ({ ...it, _action: ACTION_ADD }))),
		],
	}),
	[NOTIFICATIONS_REMOVE]: (state, { data }) => ({
		items: [...state.items].filter((item, index) => {
			return !~data.indexOf(index);
		}),
	}),
	[MARK_NOTIFICATIONS_FOR_REMOVE_BY_UID]: (state, { data }) => ({
		items: [
			...state.items,
			...(data.map(it => ({ ...it, _action: ACTION_REMOVE }))),
		],
	}),
});

export function addNotifications(items = []) {

	const data = Array.isArray(items) ? items : [items];

	return {
		type: NOTIFICATIONS_ADD,
		payload: { data },
	};

}

export function removeNotifications(data = []) {
	return {
		type: NOTIFICATIONS_REMOVE,
		payload: { data },
	};
}

/*
  Property `uid` can be passed while adding notification
  and then this uid can be used to delete notification from
  screen using this method
 */
export function removeNotificationsByUIDs(items = []) {
	const data = Array.isArray(items) ? items : [items];
	return {
		type: MARK_NOTIFICATIONS_FOR_REMOVE_BY_UID,
		payload: { data },
	};
}
