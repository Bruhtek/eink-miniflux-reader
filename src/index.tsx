import { Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "./hooks";
import { initialize } from "./store/minifluxSlice";

import { PropsWithChildren, useEffect } from "react";

import { containerStyles } from "./styles/styles";
import LoginView from "./components/loginView";
import LoadingView from "./components/loadingView";

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

	return (
		<Container>
			<Text>Logged in: {loggedIn ? "yes" : "no"}</Text>
		</Container>
	);
}

function Container(props: PropsWithChildren) {
	return <View style={containerStyles.mainContainer}>{props.children}</View>;
}

export default Root;
