export const nameToRouteName = (name: string) => {
	const routerName = name.replaceAll(/[$&+,:;=?@#|'<>.^*()%!\-_\s]{2,}/g, '-').replaceAll(/[$&+,:;=?@#|'<>.^*()%!_]{1}/g, '-').replaceAll(' ', '-').toLowerCase();
	return routerName.match(/^modul\-\d+\-/) ? routerName.split('-').slice(0, 2).join('-') : routerName;
}