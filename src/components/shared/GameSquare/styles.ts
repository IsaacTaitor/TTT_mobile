import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	gamesSquare: {
		width: "23%",
		height: 74,
		marginBottom: 5
	},
	body: {
		width: "100%",
		height: "100%"
	},
	title: {
		paddingLeft: 5,
		paddingTop: 5,
		color: "white"
	},
	titleView: {
		paddingLeft: 5,
		paddingTop: 5,
		width: "90%",
		height: "90%"
	},
	titleEndGame: {
		fontSize: 13,
		maxWidth: 40
	},
	titleWin: {
		color: "#FFAF0A"
	},
	indent: {
		marginRight: "2%"
	},
	time: {
		fontSize: 10,
		position: "absolute",
		bottom: 2,
		right: 1
	},
	checkmark: {
		fontSize: 18,
		paddingLeft: 5,
		color: "#FFAF0A"
	},
	player: {
		borderBottomWidth: 0.5,
		paddingBottom: 3,
		marginBottom: 3,
		flexDirection: "row"
	},
	playing: {
		backgroundColor: "#838383"
	},
	end: {
		backgroundColor: "#D3D3D3"
	}
});