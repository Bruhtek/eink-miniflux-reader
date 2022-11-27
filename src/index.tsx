import { useAppDispatch, useAppSelector } from "./hooks";
import {
	initialize,
	tryFetchFeeds,
	tryGetAllEntries,
} from "./store/minifluxSlice";

import { useEffect } from "react";

import LoginView from "./views/login/loginView";
import LoadingView from "./views/loading/loadingView";
import Navigator from "./views/navigator";

import { Container } from "./components/containter";

import { FetchingProgress } from "./store/minifluxSlice";

function Root() {
	const initialized = useAppSelector((state) => state.miniflux.initialized);
	const loggedIn = useAppSelector((state) => state.miniflux.loggedIn);

	const fetchingProgress = useAppSelector(
		(state) => state.miniflux.fetchingProgress,
	);

	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(initialize());
	}, []);

	useEffect(() => {
		if (fetchingProgress === FetchingProgress.Finished) {
			return;
		}
		if (fetchingProgress === FetchingProgress.NotStarted) {
			return;
		}
		if (fetchingProgress === FetchingProgress.FetchingFeeds) {
			dispatch(tryFetchFeeds());
		}
		if (fetchingProgress === FetchingProgress.FetchingEntries) {
			dispatch(tryGetAllEntries());
		}
	}, [fetchingProgress]);

	if (!initialized) {
		return (
			<Container>
				<LoadingView />
			</Container>
		);
	}

	if (!loggedIn) {
		return (
			<Container>
				<LoginView />
			</Container>
		);
	}

	return <Navigator />;
}

export default Root;
