import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		backgroundColor: "#efefef"
	},
	content: {
		paddingLeft: 24,
		paddingRight: 24
	},
	button: {
		backgroundColor: "#009789",
		width: 125,
		height: 50,
		justifyContent: "center",
		alignItems: "center"
	},
	statusGameView: {
		justifyContent: "center",
		alignItems: "center",
		height: 70
	},
	statusTextWin: {
		fontSize: 18,
		color: "green" 
	},
	statusTextLose: {
		fontSize: 18,
		color: "red"
	},
	statusTextDraw: {
		fontSize: 18,
		color: "black"
	},
	viewButton: {
		justifyContent: "center",
		alignItems: "center"
	},
	viewTimeGame: {
		justifyContent: "center",
		alignItems: "center",
		height: 70
	},
	time: {
		fontSize: 20
	}
});