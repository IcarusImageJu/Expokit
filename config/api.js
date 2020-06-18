import env from '../constants/env';

const API = () => {
	switch (env) {
		case 'local':
			return 'youLocalApi';
		case 'dev':
			return 'yourDevApi';
		case 'staging':
			return 'yourStagingApi';
		default:
			return 'yourProdApi';
	}
};

export default API;
