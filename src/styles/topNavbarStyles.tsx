import { StyleSheet } from "react-native";

export const topNavbarStyles = StyleSheet.create({
	container: {
		flex: 0,
		height: 50,
		borderBottomWidth: 3,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		paddingHorizontal: 10,
	},
	titleText: {
		fontSize: 20,
	},
	beforeTitleContainer: {
		flex: 0,
		height: "100%",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		paddingRight: 10,
	},
	rightItemsContainer: {
		flex: 1,
		height: "100%",
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		paddingLeft: 10,
	},
});
