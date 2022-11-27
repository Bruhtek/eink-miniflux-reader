import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./home/home";
import Feeds from "./feeds/feeds";
import Settings from "./settings/settings";
import { NavigationContainer } from "@react-navigation/native";
import EntriesView from "./entries/entriesView";

const Stack = createNativeStackNavigator<RootStackParamList>();

function Navigator() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Home"
				screenOptions={{ headerShown: false }}
			>
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="Feeds" component={Feeds} />
				<Stack.Screen name="Settings" component={Settings} />
				<Stack.Screen name="Entries" component={EntriesView} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export type RootStackParamList = {
	Home: undefined;
	Feeds: undefined;
	Settings: undefined;
	Entries: {
		title: string;
		filter: {
			feedId?: string;
			status?: "unread" | "read" | "removed";
		};
	};
};

export default Navigator;
