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
		borderBottomWidth: 3,
		alignItems: "center"
	},
	cell: {
		borderColor: "#f2ca4b",
		width: 70,
		height: 70
	},
	borderBottomWidth: {
		borderBottomWidth: 5
	},
	borderRightWidth: {
		borderRightWidth: 5
	},
	scoreBoard: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		paddingTop: 10,
		paddingBottom: 20
	}
});