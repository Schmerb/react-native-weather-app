import React, { Component } from 'react';

import {
	StyleSheet,
    Text,
    View
} from 'react-native';

export default function DataOutputView(props) {
    return(
		<View style={styles.results}>
			<Text style={styles.base}>{props.currentLocation}</Text>
            <Text style={[styles.base, styles.temp]}>{props.temp} ℃</Text>
            <Text style={[styles.base, styles.humidity]}>{props.humidity}%</Text>
            <Text style={styles.base}>{props.timestamp}</Text>
        </View>
	);
}

const styles = StyleSheet.create({
	base: {
		color: "white",
        fontSize: 24,
		fontWeight: 'bold',
		alignSelf: 'center'
	},
	results: {
		marginTop: 50,
		marginBottom: 50,
	},
	temp: {
		fontSize: 90
	},
	humidity: {
		fontSize: 60
	}
});
