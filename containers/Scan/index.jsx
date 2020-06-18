import React, { memo, useEffect } from 'react';
import {
	View, ActivityIndicator, Text,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
// import * as IntentLauncher from 'expo-intent-launcher';

import { Camera } from 'expo-camera';
import posed from 'react-native-pose';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { withRouter } from '../../services/router';
import Sentry from '../../services/sentry';
import { useInjectReducer } from '../../utils/injectReducer'; // eslint-disable-line
import { useInjectSaga } from '../../utils/injectSaga'; // eslint-disable-line

import styles from './styles';
import { t } from '../../services/i18n';
import reducer from './reducer';
import saga from './saga';
import makeSelectScan from './selectors';
import { makeSelectLocations } from '../../providers/LocationsProvider/selectors';
import {
	unmount, scanning, permission, setLocation, checkLocationWithData,
} from './actions';

import Title from '../../components/Content/Title';
import IconHeader from '../../components/IconHeader';
import Content from '../../components/Content/Content';
import SubTitle from '../../components/Content/SubTitle';
import IconListControl from '../../components/IconListControl';
// import Control from '../../components/Control';
import Paragraph from '../../components/Content/Paragraph';
import defaultStyle from '../../constants/stylesheet';

const key = 'scan';

const Modal = posed.View({
	visible: {
		y: 0,
	},
	hidden: {
		y: defaultStyle.$windowHeight,
	},
});

const ModalContainer = posed.View({
	visible: {
		opacity: 1,
	},
	hidden: {
		opacity: 0,
	},
});

function Scan({
	scan,
	handleUmount,
	handleScan,
	handlePermission,
	history,
	locations,
	handleSetLocation,
	handleCheckLocationWithData,
}) {
	useInjectReducer({ key, reducer });
	useInjectSaga({ key, saga });

	const {
		scanned, location, loading, havePermission,
	} = scan;

	async function getPermission() {
		try {
			const { status } = await Permissions.askAsync(Permissions.CAMERA);
			handlePermission(status === 'granted');
		} catch (error) {
			Sentry.captureException(error);
		}
	}

	// async function grantAccess() {
	// 	// TODO: Add the package name when it will be available
	// 	const { resultCode } = await IntentLauncher.startActivityAsync(IntentLauncher.ACTION_APPLICATION_DETAILS_SETTINGS, { packageName: 'safe-buildings' });
	// 	console.log(resultCode);

	// 	if (resultCode === -1) {
	// 		getPermission();
	// 	}
	// }

	useEffect(() => {
		if (!havePermission) {
			getPermission();
		}
		return () => {
			handleUmount();
		};
	}, []);
	useEffect(() => {
		if (scanned && location) {
			history.push(`/location/${location}`);
		} else {
			getPermission();
		}
	}, [scanned]);
	useEffect(() => {
		if (scan.data) {
			const matchLocation = locations.find((item) => String(item.id) === String(scan.data));
			if (matchLocation) {
				handleSetLocation(scan.data);
			} else {
				handleCheckLocationWithData(scan.data);
			}
		}
	}, [scan.data]);

	return (
		<View style={styles.container}>
			<View style={styles.heading}>
				<Title title={t('Scan QR Code')} />
				<IconHeader
					title={t('scanQRSubTitle')}
					color={EStyleSheet.value('$blueLight')}
					icon="md-qr-scanner"
				/>
			</View>
			{!havePermission && !loading && (
				<Content flex>
					<SubTitle title={t('You need to grant access to your camera')} />
					{/* <Control
						title={t('Grant access to your camera')}
						onPress={grantAccess}
					/> */}
				</Content>
			)}
			{havePermission && (
				<View style={styles.codeContainer}>
					<Camera
						onBarCodeScanned={({ data }) => (loading || scanned ? null : handleScan(data))}
						style={styles.barcode}
						autoFocus="on"
						whiteBalance="auto"
						barCodeScannerSettings={{
							barcodeTypes: [
								BarCodeScanner.Constants.BarCodeType.qr,
								BarCodeScanner.Constants.BarCodeType.datamatrix,
							],
						}}
					>
						<View style={styles.activity}>
							<ActivityIndicator animating={loading} size="large" color={EStyleSheet.value('$white')} />
						</View>
						<View style={[styles.barcodeCorner, styles.barcodeCornerTopLeft]} />
						<View style={[styles.barcodeCorner, styles.barcodeCornerTopRight]} />
						<View style={[styles.barcodeCorner, styles.barcodeCornerBottomRight]} />
						<View style={[styles.barcodeCorner, styles.barcodeCornerBottomLeft]} />
					</Camera>
				</View>
			)}
			<ModalContainer
				pose={scanned && !location ? 'visible' : 'hidden'}
				initialPose="hidden"
				style={styles.modalContainer}
			>
				<Modal style={styles.modal}>
					<ScrollView contentContainerStyle={styles.modalInner}>
						<View style={styles.modalHeader}>
							<Ionicons name="ios-close-circle-outline" style={styles.modalIcon} />
							<Text style={styles.modalTitle}>{t('Scan invalide')}</Text>
							<Paragraph center>
								You do not have access to this location, or the QR code does not correspond to any location.
							</Paragraph>
						</View>
						<IconListControl
							title={t('New scan')}
							icon="md-qr-scanner"
							onPress={handleUmount}
							color={EStyleSheet.value('$blueLight')}
						/>
						<IconListControl
							title={t('Search')}
							icon="md-search"
							to="/search"
							color={EStyleSheet.value('$peach')}
						/>
					</ScrollView>
				</Modal>
			</ModalContainer>
		</View>
	);
}

const mapStateToProps = createStructuredSelector({
	scan: makeSelectScan(),
	locations: makeSelectLocations(),
});

export function mapDispatchToProps(dispatch) {
	return {
		handleUmount: () => dispatch(unmount()),
		handleScan: (data) => dispatch(scanning(data)),
		handlePermission: (status) => dispatch(permission(status)),
		handleSetLocation: (location) => dispatch(setLocation(location)),
		handleCheckLocationWithData: (data) => dispatch(checkLocationWithData(data)),
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(
	withConnect,
	memo,
	withRouter,
)(Scan);
