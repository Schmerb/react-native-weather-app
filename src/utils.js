import { Dimensions, Platform } from 'react-native';

const instructions = Platform.select({
	ios: 'Press Cmd+R to reload,\n' +
		'Cmd+D or shake for dev menu',
	android: 'Double tap R on your keyboard to reload,\n' +
		'Shake or press menu button for dev menu',
});

const { width, height } = Dimensions.get('window');

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const OPEN_WEATHER_API_KEY = '2c1b03704a33bb51b82cffd4c74ef9a5';
const OPEN_WEATHER_BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';

module.exports = {
    SCREEN_HEIGHT,
    SCREEN_WIDTH,
    ASPECT_RATIO,
    LATITUDE_DELTA,
    LONGITUDE_DELTA,
    OPEN_WEATHER_BASE_URL,
    OPEN_WEATHER_API_KEY,
    instructions
};