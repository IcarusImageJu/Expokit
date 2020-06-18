import React, { memo, useEffect } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { BlackPortal } from 'react-native-portal';
import { useParams, useHistory } from '../../../../services/router';
import Sentry from '../../../../services/sentry';
import ButtonHeader from '../../../../components/ButtonHeader';
import IconListControl from '../../../../components/IconListControl';
import Paragraph from '../../../../components/Content/Paragraph';
import Content from '../../../../components/Content/Content';
import SubTitle from '../../../../components/Content/SubTitle';
import Separator from '../../../../components/Separator';
import { t } from '../../../../services/i18n';
import styles from './styles';
import ChecklistResponseItem from '../../../../components/ChecklistResponseItem';
import ENUM_TYPE_CHECKLIST from '../../../../constants/enumTypeChecklist';
import { makeSelectButtons } from '../../../../providers/ButtonsProvider/selectors';
import { makeSelectLocations } from '../../../../providers/LocationsProvider/selectors';
import { loadChecklist, deleteCurrentInProgress, resetLoading } from '../../../../providers/ChecklistProvider/actions';
import {
	makeSelectChecklistsLoading,
	makeSelectChecklistsInProgress,
	makeSelectChecklists,
	makeSelectResponses,
	makeSelectResponsessLoading,
} from '../../../../providers/ChecklistProvider/selectors';
import FloatActionButton from '../../FloatActionButton';
import Alert from '../../../../services/alert';
import { loadButtons } from '../../../../providers/ButtonsProvider/actions';
import decodeCMSEncoding from '../../../../utils/decodeCMSEncoding';
import ContactPerson from '../../../../components/ContactPerson';

function ButtonChecklist({
	locations,
	buttons,
	handleLoadButton,
	handleLoadChecklist,
	loading,
	inProgress,
	checklists,
	responses,
	loadingResponse,
	handleDeleteCurrentInProgress,
	handleResetLoading,
}) {
	const { locationId, buttonId } = useParams();
	const history = useHistory();
	const currentLocation = locations.find(({ id }) => id === locationId);
	const currentButton = buttons.find((button) => button?.id === buttonId);
	const field2 = currentButton?.field2;
	const field3 = currentButton?.field3;
	const field7 = currentButton?.field7;
	const field18 = currentButton?.field18;
	const contacts = field18 ? JSON.parse(decodeCMSEncoding(field18)).contacts : [];
	const checklistId = Number(field7);
	const currentChecklist = checklists.find((el) => Number(el.id) === checklistId);
	const isInProgress = inProgress ? inProgress.find((el) => Number(el.checklist) === checklistId) : false;
	let timer;

	useEffect(() => {
		handleLoadButton(currentLocation);
		handleLoadChecklist(checklistId);
		Sentry.addBreadcrumb({
			category: 'Button',
			message: field2 || '',
			level: Sentry.Severity.Info,
		});
	}, [locationId, buttonId]);

	useEffect(() => {
		const isActive = JSON.parse(currentChecklist?.field7 ?? true);
		if (!isActive) {
			Alert.alert(
				t('checklistNotActiveTitle'),
				t('checklistNotActiveMessage'),
				[
					{ text: 'OK', onPress: history.goBack },
				],
				{ cancelable: false },
			);
		}
		if (!loading && !currentChecklist) {
			// The most ugly dbl check... shame !
			// Easy fix for when they don't add a checklist to a button
			// I have to set timeout because sometimes loading is done but the currentchecklist is undefined
			timer = setTimeout(() => {
				if (!loading && !currentChecklist) {
					Alert.alert(
						t('buttonWithoutChecklistTitle'),
						t('buttonWithoutChecklistMessage'),
						[
							{ text: 'OK', onPress: history.goBack },
						],
						{ cancelable: false },
					);
				}
			}, 2000);
		} else {
			clearTimeout(timer);
		}

		return () => {
			handleResetLoading();
			clearTimeout(timer);
		};
	}, [currentChecklist]);

	function actionsControl() {
		if (!currentChecklist || loading) {
			return <ActivityIndicator size="small" color={EStyleSheet.value('$grey')} />;
		}
		if (isInProgress) {
			return (
				<>
					<IconListControl
						color={EStyleSheet.value('$blue')}
						title={t('Resume')}
						icon="md-checkbox-outline"
						to={{
							pathname: `/location/${locationId}/checklist/${checklistId}`,
							state: { type: ENUM_TYPE_CHECKLIST.UPDATE },
						}}
					/>
					<IconListControl
						color={EStyleSheet.value('$red')}
						title={t('Delete')}
						icon="trash-2"
						iconType="Feather"
						onPress={() => handleDeleteCurrentInProgress(checklistId)}
					/>
				</>
			);
		}
		return (
			<IconListControl
				color={EStyleSheet.value('$blue')}
				title={t('Start')}
				icon="md-checkbox-outline"
				to={{
					pathname: `/location/${locationId}/checklist/${checklistId}`,
					state: { type: ENUM_TYPE_CHECKLIST.CREATE },
				}}
			/>
		);
	}

	return (
		<ScrollView contentContainerStyle={styles.scrollInner}>
			<ButtonHeader
				location={currentLocation?.field2 || currentLocation?.id}
				title={field2 || ''}
				context={field3 || ''}
				icon="md-pin"
			/>
			{contacts.length > 0 && (
				<Content flex>
					{contacts.map((contact) => (
						<ContactPerson key={contact.email} contact={{ ...contact, firstName: contact.name, lastName: '' }} />
					))}
				</Content>
			)}
			<Content>
				<SubTitle capitalize title={currentChecklist ? currentChecklist.field11 : ''} />
				{actionsControl()}
				<Separator blank />
				{!(!currentChecklist || loading) && (
					<IconListControl
						color={EStyleSheet.value('$blueDark')}
						title={t('View Checklist')}
						icon="list"
						iconType="Feather"
						to={{ pathname: `/location/${locationId}/checklist/${checklistId}`, state: { type: ENUM_TYPE_CHECKLIST.VIEW } }}
					/>
				)}
				<SubTitle title="Response" />
				<View style={styles.list}>
					{loadingResponse && <ActivityIndicator size="small" color={EStyleSheet.value('$grey')} />}
					{!loadingResponse && !responses.find((response) => response.field2 === currentChecklist?.id) && (
						<Paragraph>There is no response for this checklist yet.</Paragraph>
					)}
					{[...responses].reverse().map((response) => {
						if (response.field2 === currentChecklist?.id) {
							return (
								<React.Fragment key={response.id}>
									<ChecklistResponseItem response={response} />
									<Separator flat />
								</React.Fragment>
							);
						}
						return null;
					})}
				</View>
			</Content>
			<BlackPortal name="fab">
				<FloatActionButton locationId={locationId} />
			</BlackPortal>
		</ScrollView>
	);
}

const mapStateToProps = createStructuredSelector({
	locations: makeSelectLocations(),
	buttons: makeSelectButtons(),
	loading: makeSelectChecklistsLoading(),
	checklists: makeSelectChecklists(),
	inProgress: makeSelectChecklistsInProgress(),
	responses: makeSelectResponses(),
	loadingResponse: makeSelectResponsessLoading(),
});

export function mapDispatchToProps(dispatch) {
	return {
		handleLoadChecklist: (checklistId) => dispatch(loadChecklist(checklistId)),
		handleDeleteCurrentInProgress: (checklistId) => dispatch(deleteCurrentInProgress(checklistId)),
		handleResetLoading: () => dispatch(resetLoading()),
		handleLoadButton: (location) => dispatch(loadButtons(location)),
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(
	withConnect,
	memo,
)(ButtonChecklist);
