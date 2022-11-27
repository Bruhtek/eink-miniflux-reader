import { Text, View } from "react-native";
import FeedItem from "./feedItem";
import { listStyles } from "../../styles/listStyles";
import { useAppSelector } from "../../hooks";

function FeedList() {
	const feeds = useAppSelector((state) => state.miniflux.feeds);

	return (
		<View style={listStyles.listContainer}>
			{Object.values(feeds).map((feed, index) => (
				<FeedItem
					title={feed.title}
					subtitle={feed.site_url}
					feedId={feed.id}
					key={index}
				/>
			))}
		</View>
	);
}

export default FeedList;
