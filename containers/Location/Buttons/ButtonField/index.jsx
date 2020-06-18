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
import SubTitle from '../../../../components/Content/SubTitle';
import ContactPerson from '../../../../components/ContactPerson';
import HtmlParser from '../../../../components/HtmlParser';
import FloatActionButton from '../../FloatActionButton';
import styles from './styles';
import { makeSelectButtons } from '../../../../providers/ButtonsProvider/selectors';
import decodeCMSEncoding from '../../../../utils/decodeCMSEncoding';
import { makeSelectLocations } from '../../../../providers/LocationsProvider/selectors';


function ButtonField({ buttons, locations }) {
	const { locationId, buttonId } = useParams();
	const currentButton = buttons.find((button) => button.id === buttonId);
	const field7 = JSON.parse(currentButton.field7);
	const field18 = currentButton?.field18;
	const contacts = field18 ? JSON.parse(decodeCMSEncoding(field18)).contacts : [];
	const fields = field7 ? field7.fields : [];
	const currentLocation = locations.find(({ id }) => id === locationId);

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
				{/* <Paragraph>{`${t('Last update')} ${t('date', { date: 1575471880046 })}`}</Paragraph> */}
				{contacts.map((contact) => (
					<ContactPerson key={contact.email} contact={{ ...contact, firstName: contact.name, lastName: '' }} />
				))}
				{fields.map((content) => (
					<React.Fragment key={content.name}>
						<SubTitle title={content.name} />
						<HtmlParser html={content.text} />
					</React.Fragment>
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
)(ButtonField);
