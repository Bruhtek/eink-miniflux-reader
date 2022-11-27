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
	fetchingProgress: FetchingProgress;
	error: MinifluxError | null;

	feeds: Record<string, Feed>;
	entries: Entry[];
};
export enum FetchingProgress {
	NotStarted,
	FetchingFeeds,
	FetchingEntries,
	Finished,
}
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
	fetchingProgress: FetchingProgress.NotStarted,
	error: null,

	feeds: {},
	entries: [],
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
		setFetchingProgress: (
			state,
			action: PayloadAction<FetchingProgress>,
		) => {
			state.fetchingProgress = action.payload;
		},
		login: (state, action) => {
			state.loggedIn = true;
			state.username = action.payload.username;
			state.apiUrl = action.payload.apiUrl;
			state.apiKey = action.payload.apiKey;
		},
		setFeeds: (state, action: PayloadAction<Record<string, Feed>>) => {
			state.feeds = action.payload;
		},
		setFeedIcon: (
			state,
			action: PayloadAction<{ id: string; icon: string }>,
		) => {
			state.feeds[action.payload.id].icon_data = action.payload.icon;
		},
		addEntries: (state, action: PayloadAction<Entry[]>) => {
			state.entries = [...state.entries, ...action.payload];
		},
		clearEntries: (state) => {
			state.entries = [];
		},
		clearFeedEntries: (state, action: PayloadAction<string>) => {
			state.entries = state.entries.filter(
				(entry) => entry.feed_id !== action.payload,
			);
		},
	},
});

export const {
	setError,
	clearError,
	setInitialized,
	setFetchingProgress,
	login,
	setFeeds,
	setFeedIcon,
	addEntries,
	clearEntries,
	clearFeedEntries,
} = minifluxSlice.actions;

export const initialize = () => {
	return async (dispatch: AppDispatch) => {
		const [url, apiKey] = await getLoginCredentials();
		if (url && apiKey) {
			dispatch(tryLogin(url, apiKey));
			return;
		}
		dispatch(setInitialized(true));
	};
};
export const tryLogin = (instanceUrl: string, apiKey: string) => {
	return async (dispatch: Dispatch) => {
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
				dispatch(setFetchingProgress(FetchingProgress.FetchingFeeds));
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
};
export const getFeeds = () => {
	return async (dispatch: AppDispatch, getState: () => RootState) => {
		const state = getState();
		if (Object.values(state.miniflux.feeds).length === 0) {
			dispatch(tryFetchFeeds());
		}
	};
};
export const tryFetchFeeds = () => {
	return async (dispatch: AppDispatch, getState: () => RootState) => {
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

				const feeds: Record<string, Feed> = {};
				for (const feed of body) {
					feeds[feed.id] = {
						id: feed.id,
						user_id: feed.user_id,
						title: feed.title,
						site_url: feed.site_url,
						feed_url: feed.feed_url,
						checked_at: feed.checked_at,
						last_modified: feed.last_modified_header,
						icon_id: feed.icon_id,
						icon_data: "data:null",
					};
				}

				dispatch(setFeeds(feeds));
				dispatch(setFetchingProgress(FetchingProgress.FetchingEntries));
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
};
export const tryGetFeedIcon = (feedId: string) => {
	return async (dispatch: AppDispatch, getState: () => RootState) => {
		try {
			const state = getState();
			const response = await fetch(
				state.miniflux.apiUrl + "/feeds/" + feedId + "/icon",
				{
					method: "GET",
					headers: {
						"X-Auth-Token": state.miniflux.apiKey,
					},
				},
			);

			if (response.status === 200) {
				const data = await response.json();
				dispatch(
					setFeedIcon({ id: feedId, icon: "data:" + data.data }),
				);
			} else {
				dispatch(setFeedIcon({ id: feedId, icon: "data:null" }));
			}
		} catch (e) {
			dispatch(
				setError({
					message: "Network error fetching icon",
					type: "network",
				}),
			);
		}
	};
};
export const tryGetFeedEntries = (feedId: string) => {
	return async (dispatch: AppDispatch, getState: () => RootState) => {
		dispatch(clearFeedEntries(feedId));
		try {
			const state = getState();

			const requestParams = new URLSearchParams({
				limit: "100",
				order: "published_at",
				direction: "desc",
			});

			const response = await fetch(
				state.miniflux.apiUrl +
					"/feeds/" +
					feedId +
					"/entries" +
					"?" +
					requestParams.toString(),
				{
					method: "GET",
					headers: {
						"X-Auth-Token": state.miniflux.apiKey,
					},
				},
			);
			if (response.status === 200) {
				const body = await response.json();

				const entries: Entry[] = [];
				for (const entry of body.entries) {
					entries.push({
						id: entry.id,
						feed_id: entry.feed_id,
						title: entry.title,
						author: entry.author,
						url: entry.url,
						content: entry.content,
						published_at: entry.published_at,
						created_at: entry.created_at,
						status: entry.status,
						starred: entry.starred,
					});
				}

				dispatch(addEntries(entries));
			}
		} catch (e) {
			dispatch(
				setError({
					message: "Network error fetching entries",
					type: "network",
				}),
			);
		}
	};
};
export const tryGetAllEntries = () => {
	return async (dispatch: AppDispatch, getState: () => RootState) => {
		const state = getState();
		if (Object.values(state.miniflux.feeds).length > 0) {
			dispatch(clearEntries());
			Object.values(state.miniflux.feeds).forEach((feed) => {
				dispatch(tryGetFeedEntries(feed.id));
			});
		}
		dispatch(setFetchingProgress(FetchingProgress.Finished));
	};
};

export type Feed = {
	id: string;
	user_id: string;

	title: string;
	site_url: string;
	feed_url: string;

	checked_at: string;
	last_modified: string;

	icon_id: number;
	icon_data: string;
};
export type Entry = {
	id: string;
	feed_id: string;

	title: string;
	author: string;
	url: string;
	content: string;

	published_at: string;
	created_at: string;

	status: "read" | "unread" | "removed";
	starred: boolean;
};

export default minifluxSlice.reducer;
