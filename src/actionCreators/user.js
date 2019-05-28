export function setUser(data) {
	return {
		type: 'SET_USER',
		data
	};
}

export function resetUser(data) {
	return {
		type: 'RESET_USER',
		data
	};
}
