export const isUserAdmin = user => {
	return user.userRoles && user.userRoles.includes('ADMINISTRATOR');
};

export const isUserSupervisor = user => {
	return user.userRoles && user.userRoles.includes('SUPERVISOR');
};

export const isUser = user => {
	return user.userRoles && user.userRoles.includes('USER');
};
