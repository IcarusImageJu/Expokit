import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Linking } from 'expo';
import styles from './styles';

import SubTitle from '../Content/SubTitle';
import Separator from '../Separator';

function ContactPerson({ contact }) {
	return (
		<View style={styles.container}>
			<SubTitle title={`${contact.firstName} ${contact.lastName}`} />
			{!!contact.company && (
				<Text style={styles.text}>
					{contact.company}
				</Text>
			)}
			{!!contact.roleText && (
				<Text style={styles.text}>
					{contact.roleText}
				</Text>
			)}
			{!!contact.phone && (
				<TouchableOpacity onPress={() => Linking.openURL(`tel:${contact.phone}`)}>
					<Text style={[styles.text, styles.link]}>{contact.phone}</Text>
				</TouchableOpacity>
			)}
			{!!contact.email && (
				<TouchableOpacity onPress={() => Linking.openURL(`mailto:${contact.email}`)}>
					<Text style={[styles.text, styles.link]}>{contact.email}</Text>
				</TouchableOpacity>
			)}
			<View style={styles.separator}>
				<Separator />
			</View>
		</View>
	);
}

export default ContactPerson;
