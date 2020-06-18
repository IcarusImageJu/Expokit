
/*
 *
 * LanguageProvider actions
 *
 */

import { CHANGE_LOCALE } from './constants';

import * as config from '../../config/i18n';

function changeLocale(languageLocale) {
	return {
		type: CHANGE_LOCALE,
		locale: languageLocale || config.fallback,
	};
}

export default changeLocale;
