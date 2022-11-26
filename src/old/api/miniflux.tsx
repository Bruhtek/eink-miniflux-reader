import ApiInterface, { Feed, Entry, ApiError } from "./interfaces";
import * as SecureStore from "expo-secure-store";

async function saveCredentials(url: string, apiKey: string): Promise<void> {
	await SecureStore.setItemAsync("url", url);
	await SecureStore.setItemAsync("apiKey", apiKey);
}
async function getCredentials(): Promise<[string?, string?]> {
	const url = await SecureStore.getItemAsync("url");
	const apiKey = await SecureStore.getItemAsync("apiKey");
	if (url === null || apiKey === null) {
		return [undefined, undefined];
	}
	return [url, apiKey];
}

class MinifluxApi implements ApiInterface {
	private _apiKey = "";
	private _url = "";
	private _apiPath = "/v1/";
	private _username = "";

	private apiUrl() {
		return this._url + this._apiPath;
	}

	private feeds: Feed[] = [];

	public username: string | null = null;
	public loggedIn = false;
	public initialized = false;

	constructor() {
		return this;
	}

	async initialize(): Promise<void> {
		const [url, apiKey] = await getCredentials();
		if (url === undefined || apiKey === undefined) {
			return;
		}

		await this.login(url, apiKey);
		return;
	}

	async login(url: string, apiKey: string): Promise<boolean | ApiError> {
		try {
			const response = await fetch(url + this._apiPath + "/me", {
				method: "GET",
				headers: {
					"X-Auth-Token": apiKey,
				},
			});

			if (response.status === 200) {
				const data = await response.json();

				saveCredentials(url, apiKey);
				this._username = data.username;
				this.loggedIn = true;
				this._url = url;
				this._apiKey = apiKey;
				return true;
			}
			if (response.status === 401) {
				return new ApiError("Invalid API key", "Login");
			}

			return new ApiError("Error logging in", "Login");
		} catch (e) {
			return new ApiError("Error connecting to the server", "Login");
		}
	}

	async updateFeeds(): Promise<Feed[] | ApiError> {
		try {
			const response = await fetch(this.apiUrl() + "/feeds", {
				method: "GET",
				headers: {
					"X-Auth-Token": this._apiKey,
				},
			});
			if (response.status === 200) {
				const data = await response.json();
				const feeds: Feed[] = [];

				for (const feed of data) {
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

				this.feeds = feeds;
				return feeds;
			}

			return new ApiError("Error fetching feeds", "Feeds");
		} catch (e) {
			console.log(e);
			return [];
		}
	}
	async getFeeds(): Promise<Feed[] | ApiError> {
		if (this.feeds.length > 0) {
			return this.feeds;
		}
		return this.updateFeeds();
	}

	async getFeedIcon(feed: Feed): Promise<string | ApiError> {
		if (feed.icon_data !== undefined) {
			return feed.icon_data;
		}
		try {
			const response = await fetch(
				this.apiUrl() + "/feeds/" + feed.id + "/icon",
				{
					method: "GET",
					headers: {
						"X-Auth-Token": this._apiKey,
					},
				},
			);

			if (response.status === 200) {
				const data = await response.json();

				feed.icon_data = "data:" + data.data;
				this.feeds = this.feeds.map((f) => {
					if (f.id === feed.id) {
						return feed;
					}
					return f;
				});

				return "data:" + data.data;
			} else {
				return new ApiError("No icon found", "Feed Icon");
			}
		} catch (e) {
			return new ApiError("Error fetching feed icon", "Feed Icon");
		}
	}

	async getEntries(feed: Feed): Promise<Entry[] | ApiError> {
		return this.updateEntries(feed);
	}
	async updateEntries(feed: Feed): Promise<Entry[] | ApiError> {
		try {
			const parameters = new URLSearchParams({
				limit: "20",
				order: "published_at",
				direction: "desc",
			});

			const response = await fetch(
				this.apiUrl() +
					"/feeds/" +
					feed.id +
					"/entries" +
					"?" +
					parameters,
				{
					method: "GET",
					headers: {
						"X-Auth-Token": this._apiKey,
					},
				},
			);

			if (response.status === 200) {
				const data = await response.json();

				const entries: Entry[] = [];

				for (const entry of data.entries) {
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

				return entries;
			} else {
				console.warn(response);
				return new ApiError("Error fetching entries", "Entries");
			}
		} catch (e) {
			console.error(e);
			return new ApiError("Error fetching entries", "Entries");
		}
	}
}

const api = new MinifluxApi();
export default api;
