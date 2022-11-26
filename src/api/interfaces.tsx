interface ApiInterface {
	loggedIn: boolean;
	initialized: boolean;

	login: (url: string, apiKey: string) => Promise<boolean | ApiError>;
	getFeeds: () => Promise<Feed[] | ApiError>;
	updateFeeds: () => Promise<Feed[] | ApiError>;

	getFeedIcon: (feed: Feed) => Promise<string | ApiError>;

	getEntries: (feed: Feed) => Promise<Entry[] | ApiError>;
	updateEntries: (feed: Feed) => Promise<Entry[] | ApiError>;
}

type Feed = {
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
type Entry = {
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

class ApiError {
	message: string;
	category: string;

	constructor(message: string, category: string) {
		this.message = message;
		this.category = category;
		return this;
	}
}

export default ApiInterface;
export { Feed, Entry, ApiError };
