import i18next from 'i18next';
import * as config from '../../config/i18n';

import dateService from './date';
import languageDetector from './languageDetector';
import translationLoader from './translationLoader';

const i18n = {
	/**
     * @returns {Promise}
     */
	init: () => new Promise((resolve, reject) => {
		i18next
			.use(languageDetector)
			.use(translationLoader)
			.init({
				fallbackLng: config.fallback,
				ns: config.namespaces,
				defaultNS: config.defaultNamespace,
				interpolation: {
					escapeValue: false,
					format(value, format) {
						const d = new Date(value);
						if (d instanceof Date) {
							return dateService.format(d, format);
						}
						return null;
					},
				},
			}, (error) => {
				if (error) { return reject(error); }
				return dateService.init(i18next.language)
					.then(resolve)
					.catch((err) => reject(err));
			});
	}),

	/**
     * @param {string} key
     * @param {Object} options
     * @returns {string}
     */
	t: (key, options) => i18next.t(key, options),

	/**
     * @returns {string}
     */
	get locale() { return i18next.language; },

	/**
     * Similar to React Native's Platform.select(),
     * i18n.select() takes a map with two keys, 'rtl'
     * and 'ltr'. It then returns the value referenced
     * by either of the keys, given the current
     * locale's direction.
     *
     * @param {Object<string,mixed>} map
     * @returns {mixed}
     */
	select(map, key) {
		return map[key];
	},
};

export const { t } = i18n;

export default i18n;
