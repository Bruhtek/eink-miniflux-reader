import { Pressable, StyleSheet, Text, View } from "react-native";
import Navbar from "../../navigation/topNavbar/navbar";
import FAIcons from "@expo/vector-icons/FontAwesome";

import api from "../../api/miniflux";
import { ApiError, Feed } from "../../api/interfaces";
import { useEffect, useState } from "react";
import FeedView from "./feedView";

function Index() {
	const [feeds, setFeeds] = useState<Feed[]>([]);

	async function getFeeds() {
		setFeeds([]);
		const apiFeeds = await api.updateFeeds();
		if (apiFeeds instanceof ApiError) {
			console.log("Error fetching feeds");
			return;
		}
		setFeeds(apiFeeds);
	}

	useEffect(() => {
		api.getFeeds().then((feeds) => {
			if (feeds instanceof ApiError) {
				console.log("Error fetching feeds");
				return;
			}
			setFeeds(feeds);
		});
	}, []);

	const icons = [
		<FAIcons
			name={"rotate-right"}
			size={30}
			color={"#000"}
			key={1}
			onPress={() => getFeeds()}
		/>,
	];

	return (
		<View style={{ flex: 1 }}>
			<Navbar title="Feeds" rightIcons={icons} />
			<View style={[feeds.length > 0 ? null : styles.bodyCenter]}>
				{feeds.length > 0 ? (
					feeds.map((feed) => <FeedView feed={feed} key={feed.id} />)
				) : (
					<FAIcons name={"rotate-right"} size={30} color={"#000"} />
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	bodyCenter: {
		flex: 1,
		textAlign: "center",
		justifyContent: "center",
		alignItems: "center",
	},
});

export default Index;
