import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

import { AppDispatch, RootState } from "./store";
import App from "../../App";

const apiPath = "/v1";

type MinifluxState = {
	apiKey: string;
	apiUrl: string;
	username: string;

	loggedIn: boolean;
	initialized: boolean;
	error: MinifluxError | null;

	feeds: Feed[];
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

	feeds: [],
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
		setFeeds: (state, action: PayloadAction<Feed[]>) => {
			state.feeds = action.payload;
		},
	},
});
export const { setError, clearError, setInitialized, login, setFeeds } =
	minifluxSlice.actions;

export const initialize = () => async (dispatch: AppDispatch) => {
	const [url, apiKey] = await getLoginCredentials();
	if (url && apiKey) {
		dispatch(tryLogin(url, apiKey));
		return;
	}
	dispatch(setInitialized(true));
};
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

export const tryFetchFeeds =
	() => async (dispatch: AppDispatch, getState: () => RootState) => {
		try {
			const state = getState();
			const response = await fetch(state.miniflux.apiUrl + "/feeds", {
				method: "GET",
				headers: {
					"X-Auth-Token": state.miniflux.apiKey,
				},
			});
			if (response.status === 200) {
				const body = await response.json();

				const feeds: Feed[] = [];
				for (const feed of body) {
					feeds.push({
						id: feed.id,
						user_id: feed.user_id,
						title: feed.title,
						site_url: feed.site_url,
						feed_url: feed.feed_url,
						checked_at: feed.checked_at,
						last_modified: feed.last_modified_header,
						icon_id: feed.icon_id,
					});
				}

				dispatch(setFeeds(feeds));
			} else {
				dispatch(
					setError({
						message: "Error fetching feeds!",
						type: "fetch",
					}),
				);
			}
		} catch (e) {
			dispatch(
				setError({
					message: "Network error fetching feeds!",
					type: "network",
				}),
			);
		}
	};

export type Feed = {
	id: number;
	user_id: number;

	title: string;
	site_url: string;
	feed_url: string;

	checked_at: string;
	last_modified: string;

	icon_id: number;
	icon_data?: string;
};
export type Entry = {
	id: number;
	feed_id: number;

	title: string;
	author: string;
	url: string;
	content: string;

	published_at: string;
	created_at: string;

	status: string;
	starred: boolean;
};

export default minifluxSlice.reducer;
