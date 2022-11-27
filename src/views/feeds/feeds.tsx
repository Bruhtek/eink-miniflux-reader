import { Text, View } from "react-native";

import { containerStyles } from "../../styles/containerStyles";
import Navbar from "../navbar/navbar";
import { Container } from "../../components/containter";
import { useAppDispatch } from "../../hooks";
import { useEffect } from "react";
import { getFeeds } from "../../store/minifluxSlice";

import FeedList from "./feedList";

function Feeds() {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(getFeeds());
	}, []);

	return (
		<Container>
			<View style={containerStyles.contentContainer}>
				<FeedList />
			</View>
			<View style={containerStyles.navbarContainer}>
				<Navbar selected={1} />
			</View>
		</Container>
	);
}

export default Feeds;
