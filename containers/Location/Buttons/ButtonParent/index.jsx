import React, { memo, useEffect } from 'react';
import { BlackPortal } from 'react-native-portal';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useParams } from '../../../../services/router';
import Sentry from '../../../../services/sentry';
import ButtonHeader from '../../../../components/ButtonHeader';
import Content from '../../../../components/Content/Content';
import Button from '../../../../components/Button';
import FloatActionButton from '../../FloatActionButton';
import styles from './styles';
import { makeSelectButtons } from '../../../../providers/ButtonsProvider/selectors';
import { makeSelectLocations } from '../../../../providers/LocationsProvider/selectors';
import decodeCMSEncoding from '../../../../utils/decodeCMSEncoding';
import ContactPerson from '../../../../components/ContactPerson';

function ButtonParent({ buttons, locations }) {
	const { locationId, buttonId } = useParams();
	const currentLocation = locations.find(({ id }) => id === locationId);
	const currentButton = buttons.find((button) => button.id === buttonId);
	const field18 = currentButton?.field18;
	const contacts = field18 ? JSON.parse(decodeCMSEncoding(field18)).contacts : [];
	const childButtons = [];
	buttons.forEach((button) => {
		if (button.field8 === buttonId) {
			childButtons.push(button);
		}
	});

	childButtons.sort((a, b) => Number(a.field14) - Number(b.field14));

	useEffect(() => {
		Sentry.addBreadcrumb({
			category: 'Button',
			message: currentButton.field2,
			level: Sentry.Severity.Info,
		});
	}, [buttonId]);

	return (
		<ScrollView contentContainerStyle={styles.scrollInner}>
			<ButtonHeader
				location={currentLocation?.field2 || currentLocation?.id}
				title={currentButton.field2}
				icon="md-pin"
				context={currentButton.field3}
			/>
			<Content flex>
				{contacts.map((contact) => (
					<ContactPerson key={contact.email} contact={{ ...contact, firstName: contact.name, lastName: '' }} />
				))}
				{childButtons.map(({ field2, id, field6 }) => (
					<Button
						content={field2}
						locationId={locationId}
						type={field6}
						buttonId={id}
						key={id}
					/>
				))}
			</Content>
			<BlackPortal name="fab">
				<FloatActionButton animate buttons={buttons} locationId={locationId} />
			</BlackPortal>
		</ScrollView>
	);
}

const mapStateToProps = createStructuredSelector({
	buttons: makeSelectButtons(),
	locations: makeSelectLocations(),
});

const withConnect = connect(
	mapStateToProps,
);

export default compose(
	withConnect,
	memo,
)(ButtonParent);
