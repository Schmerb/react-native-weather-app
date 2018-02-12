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
		backgroundColor: 'orange',
		width: 200,
		height: 50,
		marginTop: 50,
		borderRadius: 10,
	},
	txt: {
		color: "white",
		fontSize: 32
	}
});
