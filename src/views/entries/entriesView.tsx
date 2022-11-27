import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator";
import EntriesList from "./entriesList";
import { Container } from "../../components/containter";
import { View } from "react-native";
import TopNavbar from "../../components/topNavbar";

import { containerStyles } from "../../styles/containerStyles";

type Props = NativeStackScreenProps<RootStackParamList, "Entries">;

function EntriesView({ route }: Props) {
	return (
		<Container>
			<View style={containerStyles.contentContainer}>
				<TopNavbar title={route.params.title} />
				<EntriesList filter={route.params.filter} />
			</View>
		</Container>
	);
}

export default EntriesView;
