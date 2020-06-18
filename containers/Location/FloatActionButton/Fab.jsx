import React from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import posed from 'react-native-pose';

import { fabStyles as styles } from './styles';

const AnimatedButton = posed.View({
	enter: { opacity: 1, scale: 1, transition: { delay: 150, duration: 150, type: 'spring' } },
	exit: { opacity: 0, scale: 0 },
});

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
			<AnimatedButton
				pose="enter"
				initialPose={animate ? 'exit' : 'enter'}
				style={[
					styles.addButton,
					isOpen && styles.addButtonActive, {
						height: size,
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
			</AnimatedButton>
		</View>
	);
}

export default Fab;
