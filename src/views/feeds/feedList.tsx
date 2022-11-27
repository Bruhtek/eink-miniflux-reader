import { FlatList, Text, View } from "react-native";
import FeedItem from "./feedItem";
import { listStyles } from "../../styles/listStyles";
import { useAppSelector } from "../../hooks";

function FeedList() {
	const feeds = useAppSelector((state) => state.miniflux.feeds);

	return (
		<View style={listStyles.listContainer}>
			<FlatList
				data={Object.values(feeds)}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => (
					<FeedItem
						title={item.title}
						subtitle={item.site_url}
						feedId={item.id}
						key={item.id}
					/>
				)}
			/>
		</View>
	);
}

export default FeedList;
