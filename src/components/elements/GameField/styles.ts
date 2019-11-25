import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	grid: {
		alignItems: "center",
		flexDirection: "column"
	},
	row: {
		flexDirection: "row"
	},
	cell: {
		borderColor: "#f2ca4b",
		width: 70,
		height: 70,
	},
	borderBottomWidth: {
		borderBottomWidth: 5
	},
	borderRightWidth: {
		borderRightWidth: 5
	},
	viewIcon: {
		width: 65,
		height: 65,
		alignItems: "center",
		justifyContent: "center"
	},
	crossIcon: {
		color: "grey",
		fontSize: 80,
		position: "absolute",
		height: 80
	},
	noughtIcon: {
		color: "#299ddc",
		fontSize: 70,
		position: "absolute",
		height: 70
	}
});