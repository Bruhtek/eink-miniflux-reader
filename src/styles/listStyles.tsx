import { StyleSheet } from "react-native";

export const listStyles = StyleSheet.create({
	listContainer: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "flex-start",
	},
	listItem: {
		paddingRight: 10,
		flex: 0,
		height: 50,
		borderBottomWidth: 1,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	listItemPressed: {
		backgroundColor: "#ccc",
	},
	listItemTextContainer: {
		marginLeft: 10,
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
	},
	listItemIconContainer: {
		marginLeft: 10,
		flex: 0,
		height: "80%",
		aspectRatio: 1,
		backgroundColor: "#fff",
	},
	listItemIcon: {
		flex: 1,
		width: "100%",
		height: "100%",
	},
	listItemTitle: {},
	boldText: {
		fontWeight: "900",
	},
	listItemSubtitle: {
		color: "#888",
	},
});
