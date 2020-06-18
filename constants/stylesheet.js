import { Dimensions } from 'react-native';
import Constants from 'expo-constants';

const $blueLight = '#479DFF';
const $blue = '#0E6AD2';
const $blueDark = '#130769';
const $white = '#FFFFFF';
const $text = '#34446E';
const $grey = '#7E879F';
const $greyLight = '#CBCCD9';
const $greyLighter = '#EDEEF5';
const $greyLightest = '#FBFBFB';
const $borderColor = '#0000003D';
const $red = '#FF4154';
const $peach = '#FEB779';
const $peachLight = '#FEB7790D';
const $green = '#1DD2C1';

const { width: $windowWidth } = Dimensions.get('window');
const { height: $windowHeight } = Dimensions.get('window');

const { statusBarHeight: $statusBarHeight } = Constants;

const $rem = $windowWidth > 340 ? 18 : 16;
const $borderRadius = 10;

const $fontRegular = 'Montserrat-Regular';
const $fontMedium = 'Montserrat-Medium';
const $fontBold = 'Montserrat-Bold';

export default {
	$blueLight,
	$blue,
	$blueDark,
	$white,
	$text,
	$grey,
	$greyLight,
	$greyLighter,
	$greyLightest,
	$borderColor,
	$red,
	$peach,
	$peachLight,
	$green,
	$windowWidth,
	$windowHeight,
	$statusBarHeight,
	$borderRadius,
	$rem,
	$fontRegular,
	$fontMedium,
	$fontBold,
};
