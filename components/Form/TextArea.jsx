import React from 'react';
import { View, TextInput } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { stylesTextArea as styles } from './styles';

const TextArea = React.forwardRef(({
	placeholder,
	children,
	value = '',
	onChangeText,
	onChange,
	onSubmitEditing,
	autoCompleteType,
	autoCapitalize,
	returnKeyType,
	returnKeyLabel,
	textContentType,
	secureTextEntry,
	error,
	noShadow,
}, ref) => (
	<View style={[
		styles.container,
		error && styles.containerError,
		noShadow && styles.containerNoShadow,
	]}
	>
		<TextInput
			style={[styles.input, error && styles.inputError]}
			value={value}
			onChangeText={onChangeText}
			onChange={onChange}
			onSubmitEditing={onSubmitEditing}
			keyboardAppearance="dark"
			autoCompleteType={autoCompleteType}
			autoCapitalize={autoCapitalize}
			returnKeyType={returnKeyType}
			returnKeyLabel={returnKeyLabel}
			textContentType={textContentType}
			secureTextEntry={secureTextEntry}
			placeholder={children || placeholder}
			placeholderTextColor={error ? EStyleSheet.value('$red') : EStyleSheet.value('$grey')}
			multiline
			ref={ref}
		/>
	</View>
));

export default TextArea;
