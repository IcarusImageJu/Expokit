import { Alert } from 'react-native';

function alert(title, message, buttons, options) {
	return Alert.alert(title, message, buttons, options);
}

export default { alert };
