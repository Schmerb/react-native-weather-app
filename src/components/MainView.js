import React, { Component } from 'react';
import {
	StyleSheet,
    Text,
    View
} from 'react-native';

import RefreshButton  from './RefreshButton';
import DataOutputView from './DataOutputView';

import {
	SCREEN_HEIGHT,
	SCREEN_WIDTH
} from '../utils';

export default function MainView(props) {
    const { state } = props;
    return(
		<View style={styles.innerContainer}>
            <Text style={styles.welcome}>Weather At Your Location</Text>

            <DataOutputView temp={state.temp} 
                            humidity={state.humidity}
                            currentLocation={state.currentLocation}
                            timestamp={state.timestamp}/>

            <RefreshButton _handleOnPress={state._handleOnPress}/>
        </View>
	);
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
		justifyContent: "space-around",
        backgroundColor: 'rgba(0,0,0,0.3)',
		height: SCREEN_HEIGHT,
		width: SCREEN_WIDTH,
	},
	welcome: {
		color: 'orange',
		fontSize: 42,
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop: 30
	},
	image: {
		height: SCREEN_HEIGHT,
		width: SCREEN_WIDTH,
	}
});
