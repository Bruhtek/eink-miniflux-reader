import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useState } from "react";

import { ApiError } from "../api/interfaces";

function LoginScreen(props: LoginScreenProps) {
	const [url, setUrl] = useState("");
	const [apiKey, setApiKey] = useState("");

	return (
		<View style={styles.mainContainer}>
			<Text style={styles.header}>You are not logged in!</Text>
			<TextInput
				style={styles.inputText}
				onChangeText={setUrl}
				value={url}
				placeholder="Miniflux URL"
			></TextInput>
			<TextInput
				style={styles.inputText}
				onChangeText={setApiKey}
				value={apiKey}
				placeholder={"API Key"}
			></TextInput>
			<Pressable
				style={({ pressed }) => [
					styles.button,
					pressed ? styles.buttonPressed : null,
				]}
				onPress={() => props.login(url, apiKey)}
			>
				{({ pressed }) => (
					<Text
						style={[
							styles.buttonText,
							pressed ? styles.buttonTextPressed : null,
						]}
					>
						Login
					</Text>
				)}
			</Pressable>
			<Text style={styles.errorText}>
				{props.errorMessage?.message ??
					"Input the url of" +
						" your miniflux instance and your API Key"}
			</Text>
		</View>
	);
}

interface LoginScreenProps {
	login: (url: string, apiKey: string) => void;
	errorMessage?: ApiError | null;
}

const styles = StyleSheet.create({
	mainContainer: {
		width: "100%",
		height: "100%",
		alignContent: "center",
		justifyContent: "center",
		alignItems: "center",
	},
	header: {
		textAlign: "center",
	},
	button: {
		backgroundColor: "#fff",
		borderStyle: "solid",
		borderWidth: 2,
		borderColor: "#000",
		borderRadius: 10,
		padding: 10,
		paddingHorizontal: 20,
		marginTop: 20,
	},
	buttonText: {
		color: "#000",
	},
	buttonPressed: {
		backgroundColor: "#000",
	},
	buttonTextPressed: {
		color: "#fff",
	},
	inputText: {
		borderStyle: "solid",
		borderWidth: 2,
		borderColor: "#000",
		width: "65%",
		borderRadius: 10,
		padding: 5,
		marginTop: 10,
	},
	errorText: {
		backgroundColor: "#f00",
		color: "#fff",
		padding: 10,
		borderRadius: 10,
		marginTop: 10,
	},
});

export default LoginScreen;
