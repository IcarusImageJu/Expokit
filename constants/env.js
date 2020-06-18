import Constants from 'expo-constants';
import { Platform } from 'react-native';

const env = Platform.OS === 'web' ? 'prod' : Constants.manifest.releaseChannel || 'local';

export const isInDevelopment = env === 'staging' || env === 'dev' || env === 'local';
export default env;
