import React, { memo } from 'react';
import { BlackPortal } from 'react-native-portal';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useParams } from '../../../services/router';
import ButtonHeader from '../../../components/ButtonHeader';
import ContactPerson from '../../../components/ContactPerson';
import FloatActionButton from '../FloatActionButton';
import { t } from '../../../services/i18n';
import styles from './styles';
import { makeSelectLocations } from '../../../providers/LocationsProvider/selectors';
import decodeCMSEncoding from '../../../utils/decodeCMSEncoding';

function LocationContact({ locations }) {
	const { locationId } = useParams();
	const {
		field4, field5, field6, field7, field8, field9, field11,
	} = locations.find((el) => el.id === locationId);
	const address = `${field4} ${field5}, ${field6}, ${field7} ${field8}, ${field9}`;
	const parsedField11 = field11 ? JSON.parse(decodeCMSEncoding(field11)) : [];
	const contacts = [];
	parsedField11.forEach((el, i) => {
		const contact = {
			...el,
			key: `${i}${el.firstName}`,
		};
		contacts.push(contact);
	});

	return (
		<ScrollView contentContainerStyle={styles.scrollInner}>
			<ButtonHeader
				title={t('Contact')}
				context={address}
				icon="md-pin"
			/>
			{contacts.map((contact) => (
				<ContactPerson contact={contact} key={contact.key} />
			))}
			<BlackPortal name="fab">
				<FloatActionButton animate locationId={locationId} />
			</BlackPortal>
		</ScrollView>
	);
}

const mapStateToProps = createStructuredSelector({
	locations: makeSelectLocations(),
});

const withConnect = connect(
	mapStateToProps,
);

export default compose(
	withConnect,
	memo,
)(LocationContact);
