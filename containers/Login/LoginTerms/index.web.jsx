import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from '../../../utils/injectReducer'; // eslint-disable-line
import { useInjectSaga } from '../../../utils/injectSaga'; // eslint-disable-line

import reducer from './reducer';
import saga from './saga';
import makeSelectLoginTerms from './selectors';
import { submitForm } from './actions';
import { t } from '../../../services/i18n';
import Control from '../../../components/Control';
import login from '../../../services/login';
import HtmlParser from '../../../components/HtmlParser';
import Alert from '../../../services/alert';
import EULA from '../../../lang/eula';

const key = 'loginterms';

function LoginTerms({ loginTerms, handleSubmitForm, history }) {
	useInjectReducer({ key, reducer });
	useInjectSaga({ key, saga });

	const { sent, loading, error } = loginTerms;

	useEffect(() => {
		if (sent) {
			history.push('/dashboard');
		}
	}, [sent]);

	useEffect(() => {
		if (error.server) {
			Alert.alert(t('serverErrorTitle'), t('serverErrorMessage'));
		}
	}, [error.server]);

	return (
		<>
			<HtmlParser html={EULA} />
			<Control
				onPress={handleSubmitForm}
				title={t('Accept')}
				loading={loading}
			/>
			<Control
				theme="alt"
				title={t('Decline')}
				onPress={login.logout}
			/>
		</>
	);
}

const mapStateToProps = createStructuredSelector({
	loginTerms: makeSelectLoginTerms(),
});

export function mapDispatchToProps(dispatch) {
	return {
		handleSubmitForm: () => dispatch(submitForm()),
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
)(LoginTerms);
