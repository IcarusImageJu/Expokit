import React from 'react';
import {
	View,
	Picker,
	Text,
} from 'react-native';
import { stylesPicker as styles } from './styles';

const PickerCustom = ({
	options = [], selected = '', onChange, prompt, placeholder,
}) => (
	<>
		{placeholder && <Text style={styles.placeholder}>{placeholder}</Text>}
		<View style={styles.container}>
			<Picker
				selectedValue={selected}
				style={styles.picker}
				prompt={prompt}
				onValueChange={(itemValue) => onChange(itemValue)}
			>
				{options.map((option) => <Picker.Item key={`${option.key}`} label={option.label} value={option.value} />)}
			</Picker>
		</View>
	</>
);

export default PickerCustom;
