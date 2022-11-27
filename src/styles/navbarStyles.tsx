import { StyleSheet } from "react-native";

export const navbarStyles = StyleSheet.create({
	navContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		borderTopWidth: 3,
	},
	navItem: {
		height: "80%",
		aspectRatio: 1,
		borderWidth: 2,
		borderColor: "black",
		borderRadius: 10,
		textAlign: "center",
		justifyContent: "center",
		alignItems: "center",
	},
	navItemSelected: {
		backgroundColor: "black",
	},
	navTextSelected: {
		color: "white",
	},
});
