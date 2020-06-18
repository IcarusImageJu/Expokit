import { en } from '../../lang/messages';

const i18n = {
	t: (key) => en.common?.[key] ?? key,
};

export const { t } = i18n;

export default i18n;
