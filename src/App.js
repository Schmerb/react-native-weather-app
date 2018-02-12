/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	AsyncStorage,
	ImageBackground,
} from 'react-native';

import MainView  	  from './components/MainView';


import {
	OPEN_WEATHER_BASE_URL,
	OPEN_WEATHER_API_KEY,
	SCREEN_HEIGHT,
	SCREEN_WIDTH,
	instructions
} from './utils';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			position: {
				loaded: false,
				latitude: 0,
				longitude: 0
			},
			temp: 0,
			humidity: 0,
			timestamp: 0,
			currentLocation: '',
			weather: []
		};
	}

	componentWillMount() {
		this._loadInitialState();
		this._getCoordinates();
	}

	componentDidUpdate(prevProps, prevState) {
		if(!prevState.position.loaded && this.state.position.loaded) {
			this._fetchWeather();
		}
	}

	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	// Loads state from AsyncStorage if data exists
	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	_loadInitialState = async () => {
		try {
			const data = await AsyncStorage.getItem('lastData');
			if(data) {
				data = JSON.parse(data);
				console.log('data from AsyncStorage', data);
				let newState = {
					temp: data.temp,
					humidity: data.humidity,
					currentLocation: data.currentLocation,
					timestamp: data.timestamp
				}
				if(data.weather) {
					newState.weather = data.weather;
				}
				this.setState(newState);
			}
		} catch(err) {
			console.error(err);
		}
	}

	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	// Gets the current user's coordinates and updates
	// state with these values
	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	_getCoordinates = () => {
		navigator.geolocation.getCurrentPosition((pos) => {
			const lat  = parseFloat(pos.coords.latitude);
			const long = parseFloat(pos.coords.longitude);

			const initialRegion = {
				loaded: true,
				latitude: lat,
				longitude: long
			};

			return this.setState({ position: initialRegion });
		},
		err => alert(JSON.stringify(err)),
		{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
	}

	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	// Fetches data from openweathermap api using current
	// coordinates, updates state on success
	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	_fetchWeather = () => {
		const { longitude: lon, latitude: lat } = this.state.position;
		const url = `${OPEN_WEATHER_BASE_URL}?lat=${lat}&lon=${lon}&units=Metric&APPID=${OPEN_WEATHER_API_KEY}`;
		console.log('fetchingWeather');
		return fetch(url)
			.then(res => res.json())
			.then((res) => {
				let data = {
					temp: res.main.temp,
					humidity: res.main.humidity,
					currentLocation: res.name,
					timestamp: new Date(Date.now()).toDateString()
				};
				if(res.weather) {
					data.weather = res.weather;
				}
				// Save in localStorage
				AsyncStorage.setItem('lastData', JSON.stringify(data));
				console.log("data going into AsyncStorage", data);
				return this.setState({
					temp: data.temp,
					humidity: data.humidity,
					timestamp: data.timestamp
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	// Handles button click to initiate fetch for new 
	// weather data
	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	_handleOnPress = () => {
		this._fetchWeather();
	}

	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	// Return appropriate image source depending on current
	// weather conditions
	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	_getBgImage = () => {
		const { weather } = this.state;
		// concatenates all weather descriptions
		let weatherStr = weather.reduce((acc, item) => `${acc} ${item.description.toLowerCase()}`, '');
		// in order of priority
		// first match is target weather for bg image, return source
		if(weatherStr.includes('snow')) {
			return Math.round(Math.random()) ?
				require('./assets/snow-closeup.jpg')
				:
				require('./assets/snow-cabin.jpg'); 
		}
		if(weatherStr.includes('rain') || weatherStr.includes('mist') || weatherStr.includes('fog')) {
			return require('./assets/rain-umbrella.jpg'); // rainy
		}
		if(weatherStr.includes('cloud')) {
			return weatherStr.includes('overcast') ?
				require('./assets/overcast.jpg') // overcast and cloudy
				:
				require('./assets/cloudy.jpg'); // cloudy
		}
		// Default fallback
		return require('./assets/balloons-clear-skies.jpg'); // clear skies
	}

	// // // // // // //
	//
	// Render method
	// 
	// // // // // // //
	render() {
		let bgImg = this._getBgImage();
		return (
			<View style={styles.container}>
				
				<ImageBackground style={styles.image} 
					   	source={bgImg} resizeMode="cover">

					<MainView state={this.state}
							_handleOnPress={this._handleOnPress}/>

				</ImageBackground>
				
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'cornflowerblue',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	innerContainer: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: 'rgba(0,0,0,0.3)',
		height: SCREEN_HEIGHT,
		width: SCREEN_WIDTH,
	},
	welcome: {
		color: 'orange',
		fontSize: 44,
		fontWeight: 'bold',
		textAlign: 'center',
		margin: 10,
		marginBottom: 50
	},
	image: {
		height: SCREEN_HEIGHT,
		width: SCREEN_WIDTH,
	}
});
