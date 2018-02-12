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
	Button,
	AsyncStorage
} from 'react-native';

import RefreshButton  from './components/RefreshButton';
import DataOutputView from './components/DataOutputView';

import {
    LATITUDE_DELTA,
    LONGITUDE_DELTA,
	OPEN_WEATHER_API_KEY,
	instructions
} from './utils';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			position: {
				latitude: 0,
				longitude: 0,
				latitudeDelta: 0,
				longitudeDelta: 0
			},
			temp: 0,
			humidity: 0,
			timestamp: 0
		};
	}


	componentWillMount() {
		this._loadInitialState();
		this._getCoordinates();
	}

	componentDidMount() {
		
	}

	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	// Loads state from AsyncStorage if data exists
	// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	_loadInitialState = async () => {
		try {
			const value = await AsyncStorage.getItem('lastData');
			if(value) {
				value = JSON.parse(value);
				console.log('value', value);
				this.setState({
					temp: value.temp,
					humidity: value.humidity,
					timestamp: value.timestamp
				});
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
			const lat = parseFloat(pos.coords.latitude);
			const long = parseFloat(pos.coords.longitude);

			const initialRegion = {
				latitude: lat,
				longitude: long,
				latitudeDelta: LATITUDE_DELTA,
				longitudeDelta: LONGITUDE_DELTA
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
		const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=Metric&APPID=${OPEN_WEATHER_API_KEY}`;

		return fetch(url)
			.then(res => res.json())
			.then((res) => {
				let data = {
					temp: res.main.temp,
					humidity: res.main.humidity,
					timestamp: new Date(Date.now()).toDateString()
				};
				// Save in localStorage
				AsyncStorage.setItem('lastData', JSON.stringify(data));
				console.log("data:", data);
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

	// // // // // // //
	//
	// Render method
	// 
	// // // // // // //
	render() {
		return (
			<View style={styles.container}>

				<Text style={styles.welcome}>Weather At Your Location</Text>

				<DataOutputView temp={this.state.temp} 
								humidity={this.state.humidity} 
								timestamp={this.state.timestamp}/>

				<RefreshButton _handleOnPress={this._handleOnPress}/>
				
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
	welcome: {
		color: 'white',
		fontSize: 28,
		textAlign: 'center',
		margin: 10,
		marginBottom: 50
	}
});
