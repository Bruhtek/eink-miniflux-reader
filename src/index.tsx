import { View } from "react-native";
import { useAppDispatch, useAppSelector } from "./hooks";
import { initialize } from "./store/minifluxSlice";

import { NavigationContainer } from "@react-navigation/native";

import { PropsWithChildren, useEffect } from "react";

import LoginView from "./views/login/loginView";
import LoadingView from "./views/loading/loadingView";
import { containerStyles } from "./styles/containerStyles";
import Navigator from "./views/navigator";

import Navbar from "./views/navbar/navbar";
import { Container } from "./components/containter";

function Root() {
	const initialized = useAppSelector((state) => state.miniflux.initialized);
	const loggedIn = useAppSelector((state) => state.miniflux.loggedIn);

	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(initialize());
	}, []);

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
