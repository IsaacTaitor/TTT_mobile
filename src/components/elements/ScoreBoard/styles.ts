import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
	}
});