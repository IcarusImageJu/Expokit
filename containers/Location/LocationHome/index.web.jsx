import React, { useEffect, memo } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';
import { useLocation, useParams } from '../../../services/router';
import Sentry from '../../../services/sentry';
import Title from '../../../components/Content/Title';
import styles from './styles';
import BoxInfosControl from '../../../components/BoxInfosControl';
import SubTitle from '../../../components/Content/SubTitle';
import { t } from '../../../services/i18n';
import { makeSelectLocations } from '../../../providers/LocationsProvider/selectors';
import HtmlParser from '../../../components/HtmlParser';
import decodeCMSEncoding from '../../../utils/decodeCMSEncoding';
import API from '../../../config/api';
import { makeSelectButtons } from '../../../providers/ButtonsProvider/selectors';
import { loadButtons } from '../../../providers/ButtonsProvider/actions';
import Button from '../../../components/Button';
import ImageSecured from '../../ImageSecured';

function LocationHome({ locations, buttons, handleLoadButtons }) {
	const location = useLocation();
	const { locationId } = useParams();
	const currentLocation = locations.find((el) => el.id === locationId);
	const field3 = JSON.parse(currentLocation.field3);
	const field11 = JSON.parse(decodeCMSEncoding(currentLocation.field11 || '[]'));
	const field14 = JSON.parse(currentLocation.field14);
	const informations = field3 ? field3.information : [];

	const haveContacts = !(field11 === null || field11.length === 0);
	const haveOverview = !(field14 === null || field14.length === 0);

	const indexCompliance = _.findIndex(buttons, ({ field15, field2 }) => field15 === currentLocation.id && field2.toUpperCase() === 'COMPLIANCE');

	const firstLevelButtons = [];
	buttons.forEach((button) => {
		const hasParentButton = button?.field8 ? buttons.find((b) => Number(b.id) === Number(button.field8)) : false;
		if (button.field15 === locationId && !hasParentButton) {
			firstLevelButtons.push(button);
		}
	});

	firstLevelButtons.sort((a, b) => Number(a.field14) - Number(b.field14));

	useEffect(() => {
		handleLoadButtons(currentLocation);
		Sentry.addBreadcrumb({
			category: 'Location',
			message: currentLocation?.field2 || currentLocation?.id,
			level: Sentry.Severity.Info,
		});
	}, [locationId]);
	return (
		<ScrollView contentContainerStyle={styles.scrollInner}>
			<View style={styles.container}>
				<Title title={currentLocation?.field2 || currentLocation?.id} />
				<View pose="enter" initialPose="exit" style={styles.boxInfos}>
					{haveContacts && (
						<View style={styles.boxInfo}>
							<BoxInfosControl
								to={`${location.pathname}/contact`}
								type="Feather"
								icon="users"
								title={t('Contact')}
							/>
						</View>
					)}
					{haveOverview && (
						<View initialPose="exit" pose="enter" style={styles.boxInfo}>
							<BoxInfosControl
								to={`${location.pathname}/infrastructure`}
								type="Entypo"
								icon="info"
								title={t('Infrastructure')}
							/>
						</View>
					)}
					{indexCompliance !== -1 && (
						<View initialPose="exit" pose="enter" style={styles.boxInfo}>
							<BoxInfosControl
								to={`${location.pathname}/button/${buttons[indexCompliance].id}`}
								type="Feather"
								icon="check-square"
								title={t('Compliance')}
							/>
						</View>
					)}
				</View>
				{informations.map((info) => (
					<React.Fragment key={info.title}>
						<SubTitle title={info.type || ''} />
						<HtmlParser html={info.description} />
					</React.Fragment>
				))}
				{(typeof currentLocation?.field20 === 'string' && currentLocation?.field20 !== '') && (
					<View style={styles.imageContainer}>
						<ImageSecured
							progressiveRenderingEnabled
							style={styles.imageWeb}
							resizeMode="contain"
							source={{ uri: `${API()}/action/getSecureFiles?id=${currentLocation.field20}` }}
						/>
					</View>
				)}
				{firstLevelButtons.length > 0 && (
					<>
						<SubTitle title="Buttons" />
						{firstLevelButtons.map((button) => (
							<Button
								key={button.id}
								content={decodeCMSEncoding(button.field2)}
								locationId={locationId}
								type={button.field6}
								buttonId={button.id}
							/>
						))}
					</>
				)}
			</View>
		</ScrollView>
	);
}

const mapStateToProps = createStructuredSelector({
	locations: makeSelectLocations(),
	buttons: makeSelectButtons(),
});

export function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		handleLoadButtons: (location) => dispatch(loadButtons(location)),
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(
	withConnect,
	memo,
)(LocationHome);
