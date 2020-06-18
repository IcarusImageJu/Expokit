import React, { useState, useEffect, createRef } from 'react';
import { View, TextInput } from 'react-native';
import posed from 'react-native-pose';
import EStyleSheet from 'react-native-extended-stylesheet';
import he from 'he';
import { stylesInput } from './styles';

const Label = posed.Text({
	inactive: {
		bottom: EStyleSheet.value('.4rem'),
		fontSize: EStyleSheet.value('.8rem'),
		transition: {
			duration: 100,
		},
	},
	active: {
		bottom: EStyleSheet.value('1.8rem'),
		fontSize: EStyleSheet.value('.6rem'),
		transition: {
			duration: 100,
		},
	},
});

const Input = React.forwardRef(({
	placeholder,
	children,
	value,
	onChangeText,
	onChange,
	onSubmitEditing,
	autoCompleteType,
	autoCapitalize,
	returnKeyType,
	returnKeyLabel,
	textContentType,
	secureTextEntry,
	keyboardType,
	error,
	onBlur = () => {},
}, ref) => {
	const currentValue = value ? he.decode(value) : '';
	const [active, setActive] = useState(currentValue.length > 0);
	const inputRef = ref || createRef();
	useEffect(() => {
		setActive(currentValue.length > 0 || inputRef.current.isFocused());
	}, [currentValue]);


	return (
		<View style={[stylesInput.container, active && stylesInput.active]}>
			<Label
				style={[stylesInput.placeholder, error && stylesInput.placeholderError]}
				pose={active ? 'active' : 'inactive'}
				onPress={() => inputRef.current.focus()}
				onFocus={() => inputRef.current.focus()}
			>
				{children || placeholder}
			</Label>
			<TextInput
				style={[stylesInput.input, error && stylesInput.inputError]}
				value={currentValue}
				onChangeText={onChangeText}
				onChange={onChange}
				onFocus={() => setActive(true)}
				onBlur={() => { setActive(currentValue.length > 0); onBlur(); }}
				ref={inputRef}
				onSubmitEditing={onSubmitEditing}
				keyboardAppearance="dark"
				autoCompleteType={autoCompleteType}
				autoCapitalize={autoCapitalize}
				returnKeyType={returnKeyType}
				returnKeyLabel={returnKeyLabel}
				textContentType={textContentType}
				secureTextEntry={secureTextEntry}
				keyboardType={keyboardType}
			/>
		</View>
	);
});

export default Input;
