import React, { Component } from 'react';

import {
	StyleSheet,
    Text,
    View
} from 'react-native';

export default function DataOutputView(props) {
    return(
		<View style={styles.results}>
            <Text style={styles.base}>Temp:             {props.temp} ℃</Text>
            <Text style={styles.base}>Humidity:      {props.humidity}%</Text>
            <Text style={styles.base}>Last Date:     {props.timestamp}</Text>
        </View>
	);
}

const styles = StyleSheet.create({
	base: {
		color: "white",
        fontSize: 24,
        fontWeight: 'bold'
	},
	results: {
		marginTop: 50,
		marginBottom: 50,
	}
});
