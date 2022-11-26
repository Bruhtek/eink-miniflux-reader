import Navbar from "./navigation/navbar";

import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useContext, useEffect, useState } from "react";
import { ApiError } from "./api/interfaces";
import LoginScreen from "./login/login";

import api from "./api/miniflux";

import Home from "./home";
import Feeds from "./feeds/feedList";
import Settings from "./settings";
import { CurrentEntryContext, CurrentFeedContext } from "./currentContexts";

import ArticlesList from "./feeds/articlesList";
import ReaderView from "./feeds/readerView/reader";

import { useSelector } from "react-redux";
import { tryLogin } from "../store/minifluxSlice";

function Root() {
	const [currentTab, setCurrentTab] = useState(0);
	const [loggedIn, setLoggedIn] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [loginError, setLoginError] = useState<ApiError | null>(null);

	const { currentEntry, setCurrentEntry } = useContext(CurrentEntryContext);
	const { currentFeed, setCurrentFeed } = useContext(CurrentFeedContext);

	const tabs = [<Home key={1} />, <Feeds key={2} />, <Settings key={3} />];

	useEffect(() => {
		api.initialize().then(() => {
			setLoaded(true);
			setLoggedIn(api.loggedIn);
		});
	}, []);

	function login(url: string, apiKey: string): void {
		api.login(url, apiKey).then((success: boolean | ApiError) => {
			if (success instanceof ApiError) {
				setLoggedIn(false);
				setLoginError(success);
				return;
			}
			setLoggedIn(success);
		});
	}

	if (!loaded) {
		return (
			<SafeAreaView>
				<Text>Loading...</Text>
			</SafeAreaView>
		);
	}

	if (!loggedIn) {
		return (
			<LoginScreen login={login} errorMessage={loginError}></LoginScreen>
		);
	}

	if (currentEntry) {
		return (
			<SafeAreaView style={styles.mainContainer}>
				<View style={styles.body}>
					<ReaderView entry={currentEntry} />
				</View>
			</SafeAreaView>
		);
	}
	if (currentFeed) {
		return (
			<SafeAreaView style={styles.mainContainer}>
				<View style={styles.body}>
					<ArticlesList feed={currentFeed} />
				</View>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.mainContainer}>
			<View style={styles.body}>{tabs[currentTab]}</View>
			<Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		width: "100%",
		height: "100%",
		flex: 1,
	},
	body: {
		flex: 9,
		marginTop: 20,
	},
});

export default Root;
