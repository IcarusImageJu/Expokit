import React from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { fabStyles as styles } from './styles';

function Fab({
	onPress, backgroundColor, iconComponent, children, isOpen, offset = 20, size = EStyleSheet.value('3rem'), animate,
}) {
	return (
		<View style={[
			styles.fabBox,
			isOpen && styles.fabBoxActive,
			{ bottom: offset + EStyleSheet.value(Platform.OS === 'ios' ? '2rem' : '4rem'), width: size },
		]}
		>
			<View
				pose="enter"
				initialPose={animate ? 'exit' : 'enter'}
				style={[
					styles.addButton,
					isOpen && styles.addButtonActive, {
						height: size,
						width: size,
					}]}
			>
				<TouchableOpacity
					style={[
						styles.addButtonInnerView,
						isOpen && styles.addButtonInnerViewActive,
						{ backgroundColor },
					]}
					onPress={onPress}
				>
					<View>
						{iconComponent || children}
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
}

export default Fab;
