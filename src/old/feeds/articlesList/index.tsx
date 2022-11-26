import { BackHandler, StyleSheet, Text, View } from "react-native";
import Navbar from "../../navigation/topNavbar/navbar";
import FAIcons from "@expo/vector-icons/FontAwesome";

import api from "../../api/miniflux";
import { ApiError, Feed, Entry } from "../../api/interfaces";
import { useContext, useEffect, useState } from "react";
import EntriesView from "./entriesView";
import { CurrentFeedContext } from "../../currentContexts";

function Index(props: { feed: Feed }) {
	const [entries, setEntries] = useState<Entry[]>([]);

	const { currentFeed, setCurrentFeed } = useContext(CurrentFeedContext);

	useEffect(() => {
		const backAction = () => {
			setCurrentFeed(undefined);
			return true;
		};

		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			backAction,
		);
		return () => backHandler.remove();
	}, []);

	async function getEntries() {
		setEntries([]);
		const apiEntries = await api.updateEntries(props.feed);
		if (apiEntries instanceof ApiError) {
			console.log("Error fetching feeds");
			return;
		}
		setEntries(apiEntries);
	}

	useEffect(() => {
		api.getEntries(props.feed).then((feeds) => {
			if (feeds instanceof ApiError) {
				console.log("Error fetching feeds");
				return;
			}
			setEntries(feeds);
		});
	}, []);

	const icons = [
		<FAIcons
			name={"rotate-right"}
			size={30}
			color={"#000"}
			key={1}
			onPress={() => getEntries()}
		/>,
	];

	return (
		<View style={{ flex: 1 }}>
			<Navbar title="Feeds" rightIcons={icons} />
			<View style={[entries.length > 0 ? null : styles.bodyCenter]}>
				{entries.length > 0 ? (
					entries.map((entry) => (
						<EntriesView entry={entry} key={entry.id} />
					))
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
