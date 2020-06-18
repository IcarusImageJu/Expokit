/* eslint-disable */
export const fallback = "en";

import {fr, en} from '../lang/messages';

export const supportedLocales = {
    // fr: {
    //     name: "Français",
    //     translationFileLoader: fr,
    //     momentLocaleLoader: () => import('moment/locale/fr'),
    // },
    en: {
        name: "English",
        translationFileLoader: en,
        momentLocaleLoader: () => import('moment/locale/en-gb'), /* eslint-disable-line */
    },
};

export const defaultNamespace = "common";

export const namespaces = [
    "common",
];