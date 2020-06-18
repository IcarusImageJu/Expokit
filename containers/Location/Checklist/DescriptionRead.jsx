import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import he from 'he';
import Sentry from '../../../services/sentry';
import ChecklistDescriptionItem from '../../../components/ChecklistDescriptionItem';
import styles from './styles';
import { t } from '../../../services/i18n';
import API from '../../../config/api';
import request from '../../../utils/request';

function DescriptionRead({ currentResponse }) {
	const [by, setBy] = useState('Loading name...');
	const [byError, setByError] = useState(false);
	async function getPersonName(id) {
		try {
			const options = {
				url: `${API()}/action/sbGetPersonName`,
				method: 'POST',
				params: {
					ajax: true,
					id,
				},
			};
			const { data } = await request(options);
			if (data?.error && typeof data !== 'object') {
				setByError(true);
				Sentry.captureMessage(data);
			} else {
				const { person: { fullName } } = data;
				setBy(he.decode(fullName));
			}
		} catch (error) {
			Sentry.captureException(error);
		}
	}
	useEffect(() => {
		if (currentResponse?.field6) { getPersonName(currentResponse?.field6); }
	}, [currentResponse.id]);

	return (
		<View style={styles.descriptionItems}>
			{!byError && <ChecklistDescriptionItem separator title={t('Completed by')} value={by} />}
			<ChecklistDescriptionItem title={t('Date completed')} value={currentResponse?.dateField1} />
		</View>
	);
}

export default DescriptionRead;
