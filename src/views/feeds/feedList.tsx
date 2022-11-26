import { Text, View } from "react-native";
import FeedItem from "./feedItem";
import { listStyles } from "../../styles/listStyles";
import { useAppSelector } from "../../hooks";

function FeedList() {
	const feeds = useAppSelector((state) => state.miniflux.feeds);

	return (
		<View style={listStyles.listContainer}>
			{feeds.map((feed, index) => (
				<FeedItem
					title={feed.title}
					subtitle={feed.site_url}
					key={index}
				/>
			))}
		</View>
	);
}

export default FeedList;
