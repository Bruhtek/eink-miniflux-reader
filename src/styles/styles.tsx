import { StyleSheet } from "react-native";

export const containerStyles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		paddingTop: 20,
	},
	centeringContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export const loginStyles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		alignContent: "center",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	},
	textStyle: {
		fontSize: 20,
	},
	textInput: {
		width: "70%",
		borderWidth: 2,
		padding: 10,
		borderColor: "black",
		borderRadius: 10,
		marginTop: 10,
		marginBottom: 10,
	},
});

export const buttonStyles = StyleSheet.create({
	pressable: {
		borderWidth: 2,
		borderColor: "black",
		padding: 5,
		borderRadius: 10,
	},
	pressablePressed: {
		backgroundColor: "black",
	},
	text: {
		fontSize: 18,
	},
	textPressed: {
		color: "white",
	},
});
