import React, { useState, useEffect, createRef } from 'react';
import { View, TextInput, Text } from 'react-native';
import he from 'he';
import { stylesInput } from './styles';

const Input = React.forwardRef(({
	placeholder,
	children,
	value,
	onChangeText,
	onChange,
	onSubmitEditing,
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
			<Text
				style={[
					stylesInput.placeholder,
					error && stylesInput.placeholderError,
					active && stylesInput.labelActive,
					!active && stylesInput.labelInactive,
				]}
				onPress={() => inputRef.current.focus()}
				onFocus={() => inputRef.current.focus()}
			>
				{children || placeholder}
			</Text>
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
