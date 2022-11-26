import { StyleSheet } from "react-native";

export const listStyles = StyleSheet.create({
	listContainer: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "flex-start",
		borderTopWidth: 2,
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
	listItemTextContainer: {
		marginLeft: 10,
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
	},
	listItemIcon: {
		marginLeft: 10,
		flex: 0,
		height: "80%",
		aspectRatio: 1,
		backgroundColor: "#aaa",
	},
	listItemTitle: {},
	listItemSubtitle: {
		color: "#888",
	},
});
