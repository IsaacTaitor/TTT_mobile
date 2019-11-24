import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		backgroundColor: "#efefef"
	},
	content: {
		paddingLeft: 24,
		paddingRight: 24
	},
	player: {
		height: 50,
		flexDirection: "row",
		alignItems: "center"
	},
	opponent: {
		height: 50,
		flexDirection: "row",
		alignItems: "center"
	},
	scoreBoard: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		paddingTop: 10,
		paddingBottom: 20
	},
	button: {
		backgroundColor: "#009789",
		width: 125,
		height: 50,
		justifyContent: "center", alignItems: "center"
	}
});