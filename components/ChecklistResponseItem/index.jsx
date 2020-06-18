import React from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';
import { useHistory, useParams } from '../../services/router';
import styles from './styles';
import ENUM_TYPE_CHECKLIST from '../../constants/enumTypeChecklist';

function ChecklistResponseItem({ response }) {
	const history = useHistory();
	const { locationId } = useParams();
	return (
		<RectButton
			style={styles.container}
			onPress={() => history.push({
				pathname: `/location/${locationId}/checklist/${response.field2}/${response.id}`,
				state: { type: ENUM_TYPE_CHECKLIST.READ },
			})}
		>
			<Ionicons style={styles.iconLeft} name="md-checkbox-outline" />
			<Text style={styles.title}>
				{response.dateField1}
			</Text>
			<Ionicons style={styles.iconRight} name="md-arrow-round-forward" />
		</RectButton>
	);
}

export default ChecklistResponseItem;
