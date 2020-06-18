import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useHistory } from '../../services/router';
import Sentry from '../../services/sentry';

function SentryRouteChange({ children, style }) {
	const history = useHistory();
	// console.log(history.location.pathname);
	useEffect(() => {
		Sentry.addBreadcrumb({
			category: 'react-router',
			message: `pathname: ${history.location.pathname}, state: ${JSON.stringify(history.location.state)}`,
			level: Sentry.Severity.Info,
		});
	}, [history.location]);
	return <View style={style}>{children}</View>;
}

export default SentryRouteChange;
