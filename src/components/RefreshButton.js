import React, { Component } from 'react';

import {
	StyleSheet,
	Text,
	TouchableOpacity
} from 'react-native';

export default function RefreshButton(props) {
    return(
		<TouchableOpacity style={styles.btn} onPress={props._handleOnPress}>
			<Text style={styles.txt}>Refresh</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	btn: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: 'rgba(100,149,237, 0.8)',
		width: 150,
		height: 150,
		borderRadius: 100,
		borderWidth: 2,
		borderColor: 'white'
	},
	txt: {
		color: "white",
		fontSize: 32
	}
});
