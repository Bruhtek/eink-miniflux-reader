import { Text, View } from "react-native";

import { containerStyles } from "../../styles/containerStyles";
import Navbar from "../bottom-navbar/navbar";
import { Container } from "../../components/containter";
import { useAppDispatch } from "../../hooks";
import { useEffect } from "react";
import { getFeeds, tryFetchFeeds } from "../../store/minifluxSlice";

import FeedList from "./feedList";
import TopNavbar from "../../components/topNavbar";
import FAIcons from "@expo/vector-icons/FontAwesome";

function Feeds() {
	const dispatch = useAppDispatch();

	const refreshFeeds = () => {
		dispatch(tryFetchFeeds());
	};

	const refreshButton = (
		<FAIcons
			name={"rotate-right"}
			size={24}
			color={"black"}
			onPress={refreshFeeds}
			key={1}
		/>
	);

	return (
		<Container>
			<View style={containerStyles.contentContainer}>
				<TopNavbar title={"Feeds"} rightItems={[refreshButton]} />
				<FeedList />
			</View>
			<View style={containerStyles.navbarContainer}>
				<Navbar selected={1} />
			</View>
		</Container>
	);
}

export default Feeds;
