import React from 'react';
import { Text, View } from 'react-native';
import Separator from '../Separator';
import styles from './styles';


function ChecklistDescriptionItem({ title, value, separator }) {
	return (
		<>
			<View style={styles.item}>
				<Text style={styles.title}>
					{title}
				</Text>
				<Text style={styles.value}>
					{value}
				</Text>
			</View>
			{separator && <Separator small />}
		</>
	);
}

export default ChecklistDescriptionItem;
