import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

const apiPath = "/v1";

type MinifluxState = {
	apiKey: string;
	apiUrl: string;
	username: string;

	loggedIn: boolean;
	initialized: boolean;
	error: MinifluxError | null;
};

type MinifluxError = {
	message: string;
	type: string;
};

const saveLoginCredentials = async (url: string, apiKey: string) => {
	await SecureStore.setItemAsync("url", url);
	await SecureStore.setItemAsync("apiKey", apiKey);
};
const getLoginCredentials = async () => {
	const url = await SecureStore.getItemAsync("url");
	const apiKey = await SecureStore.getItemAsync("apiKey");
	if (url === null || apiKey === null) {
		return [undefined, undefined];
	}
	return [url, apiKey];
};

const initialState: MinifluxState = {
	apiKey: "",
	apiUrl: "",
	username: "",

	loggedIn: false,
	initialized: false,
	error: null,
};

export const minifluxSlice = createSlice({
	name: "miniflux",
	initialState: initialState,
	reducers: {
		setError: (
			state,
			action: PayloadAction<{ message: string; type: string }>,
		) => {
			state.error = action.payload;
		},
		clearError: (state) => {
			state.error = null;
		},
		setInitialized: (state, action: PayloadAction<boolean>) => {
			state.initialized = action.payload;
		},
		login: (state, action) => {
			state.loggedIn = true;
			state.username = action.payload.username;
			state.apiUrl = action.payload.apiUrl;
			state.apiKey = action.payload.apiKey;
		},
	},
});
export const { setError, clearError, setInitialized, login } =
	minifluxSlice.actions;

export const tryLogin =
	(instanceUrl: string, apiKey: string) => async (dispatch: Dispatch) => {
		dispatch(clearError());
		try {
			const response = await fetch(instanceUrl + apiPath + "/me", {
				method: "GET",
				headers: {
					"X-Auth-Token": apiKey,
				},
			});

			if (response.status === 200) {
				const jsonData = await response.json();

				saveLoginCredentials(instanceUrl, apiKey);
				dispatch(
					login({
						username: jsonData.username,
						apiUrl: instanceUrl + apiPath,
						apiKey: apiKey,
					}),
				);
			} else {
				dispatch(
					setError({
						message: "Error logging in! Check the api key",
						type: "login",
					}),
				);
			}
			dispatch(setInitialized(true));
		} catch (e) {
			dispatch(
				setError({
					message: "Error connecting to the miniflux instance!",
					type: "network",
				}),
			);
			dispatch(setInitialized(true));
		}
	};
export const initialize = () => async (dispatch: any) => {
	const [url, apiKey] = await getLoginCredentials();
	if (url && apiKey) {
		dispatch(tryLogin(url, apiKey));
		return;
	}
	dispatch(setInitialized(true));
};

export default minifluxSlice.reducer;
