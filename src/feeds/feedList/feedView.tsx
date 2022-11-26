import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Feed, ApiError } from "../../api/interfaces";
import { useContext, useEffect, useState } from "react";
import api from "../../api/miniflux";
import { CurrentFeedContext } from "../../currentContexts";

function FeedView(props: { feed: Feed }) {
	const [icon, setIcon] = useState<string>("data:null");

	const { currentFeed, setCurrentFeed } = useContext(CurrentFeedContext);

	async function getIcon() {
		const response = await api.getFeedIcon(props.feed);
		if (response instanceof ApiError) {
			console.log("Error fetching icon");
			setIcon("https://miniflux.app/favicon.ico");
			return;
		}
		setIcon(response);
	}

	useEffect(() => {
		getIcon();
	}, []);

	return (
		<Pressable onPress={() => setCurrentFeed(props.feed)}>
			<View style={styles.feedContainer}>
				<Image style={styles.icon} source={{ uri: icon }} />
				<View style={styles.textContainer}>
					<Text style={styles.titleText}>{props.feed.title}</Text>
					<Text style={styles.secondaryText}>
						{props.feed.site_url}
					</Text>
				</View>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	feedContainer: {
		borderBottomWidth: 1,
		borderColor: "#000",
		width: "100%",
		padding: 10,
		height: 55,
		flexDirection: "row",
		alignItems: "center",
	},
	textContainer: {
		flexDirection: "column",
	},
	icon: {
		aspectRatio: 1,
		height: "90%",
		marginRight: 8,
	},
	titleText: {
		padding: 0,
		margin: 0,
	},
	secondaryText: {
		color: "#888",
		padding: 0,
		margin: 0,
	},
});

export default FeedView;
