import { View, Text, TextInput } from "react-native";

import { useState } from "react";
import Button from "../../components/buttons";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { tryLogin } from "../../store/minifluxSlice";
import { loginStyles } from "../../styles/loginStyles";

function LoginView() {
	const [url, setUrl] = useState("");
	const [apiKey, setApiKey] = useState("");

	const dispatch = useAppDispatch();
	const error = useAppSelector((state) => state.miniflux.error);

	let errorMessageComponent = <Text></Text>;

	if (error) {
		errorMessageComponent = <Text>{error.message}</Text>;
	}

	return (
		<View style={loginStyles.mainContainer}>
			<Text style={loginStyles.textStyle}>
				Login to your miniflux instance
			</Text>
			<TextInput
				style={loginStyles.textInput}
				onChangeText={setUrl}
				value={url}
				placeholder="https://miniflux.example.com"
			/>
			<TextInput
				style={loginStyles.textInput}
				onChangeText={setApiKey}
				value={apiKey}
				placeholder="Th1s-1s-N0t-4-re4l-4pI-k3y-BGKJfdjhkgaASG="
			/>
			<Button
				text={"Login"}
				onPress={() => dispatch(tryLogin(url, apiKey))}
			/>
			{errorMessageComponent}
		</View>
	);
}

export default LoginView;
