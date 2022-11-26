import { StyleSheet } from "react-native";

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
