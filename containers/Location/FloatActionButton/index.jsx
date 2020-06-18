import React, {
	useState, memo, createRef, useEffect,
} from 'react';
import {
	SafeAreaView, Platform, View, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import EStyleSheet from 'react-native-extended-stylesheet';
import posed from 'react-native-pose';
import { BlurView } from 'expo-blur';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Button from '../../../components/Button';
import styles from './styles';
import Fab from './Fab';
import { makeSelectButtons } from '../../../providers/ButtonsProvider/selectors';
import decodeCMSEncoding from '../../../utils/decodeCMSEncoding';

const AnimParent = posed.View({
	enter: { staggerChildren: 50, delayChildren: 50 },
});
const AnimItem = posed.View({
	enter: { y: 0, opacity: 1 },
	exit: { y: 100, opacity: 0 },
});
const Background = posed(Platform.OS === 'ios' ? BlurView : View)({
	enter: { opacity: 1, transition: { delay: 0, duration: 50 } },
	exit: { opacity: 0 },
});

function FloatActionButton({
	animate, buttons, locationId,
}) {
	const [isOpen, setIsOpen] = useState(false);
	const scrollViewRef = createRef();

	const firstLevelButtons = [];
	buttons.forEach((button) => {
		if (!button.field8 && button.field15 === locationId) {
			firstLevelButtons.push(button);
		}
	});

	firstLevelButtons.sort((a, b) => Number(a.field14) - Number(b.field14));

	useEffect(() => {
		if (isOpen) {
			scrollViewRef.current.scrollToEnd();
		}
	}, [isOpen]);

	return (
		<>
			{isOpen && (
				<Background intensity={90} tint="light" initialPose="exit" pose="enter" style={styles.background}>
					<SafeAreaView style={styles.listSafe}>
						<AnimParent style={styles.listSafe}>
							<ScrollView
								initialPose="exit"
								pose="enter"
								style={styles.listSafe}
								contentContainerStyle={styles.list}
								ref={scrollViewRef}
							>
								{firstLevelButtons.map(({ field2, id, field6 }) => (
									<AnimItem key={id}>
										<Button
											onPress={() => setIsOpen(false)}
											content={decodeCMSEncoding(field2)}
											locationId={locationId}
											type={field6}
											buttonId={id}
										/>
									</AnimItem>
								))}
							</ScrollView>
						</AnimParent>
					</SafeAreaView>
				</Background>
			)}

			<Fab
				onPress={() => setIsOpen(!isOpen)}
				isOpen={isOpen}
				backgroundColor={isOpen ? EStyleSheet.value('$grey') : EStyleSheet.value('$green')}
				size={EStyleSheet.value('3rem')}
				offset={Platform.OS === 'ios' ? 40 : 0}
				animate={animate}
				iconComponent={(
					<Ionicons
						color={EStyleSheet.value('$white')}
						style={styles.fabIcon}
						name={isOpen ? 'md-close' : 'ios-list'}
					/>
				)}
			/>
		</>
	);
}

const mapStateToProps = createStructuredSelector({
	buttons: makeSelectButtons(),
});

const withConnect = connect(
	mapStateToProps,
);

export default compose(
	withConnect,
	memo,
)(FloatActionButton);
