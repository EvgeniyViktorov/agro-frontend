export function createReducer(initialState, reducerMap) {
	return (state = initialState, action = {}) => {
		const reducer = reducerMap[action.type];

		return reducer ? { ...state, ...reducer(state, action.payload) } : state;
	};
}