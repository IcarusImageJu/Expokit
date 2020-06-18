import env from '../constants/env';

function MASTER_EMAIL() {
	switch (env) {
		case 'local':
			return 'master@local.com';
		default:
			return 'master@prod.com';
	}
}
export const LOCAL_AUTH_TRY_MAX = 3;

export default MASTER_EMAIL;
