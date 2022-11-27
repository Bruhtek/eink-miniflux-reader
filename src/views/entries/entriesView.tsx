import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator";
import EntriesList from "./entriesList";
import { Container } from "../../components/containter";
import { View } from "react-native";
import TopNavbar from "../../components/topNavbar";

import { containerStyles } from "../../styles/containerStyles";
import FAIcons from "@expo/vector-icons/FontAwesome";

type Props = NativeStackScreenProps<RootStackParamList, "Entries">;

function EntriesView({ route, navigation }: Props) {
	return (
		<Container>
			<View style={containerStyles.contentContainer}>
				<TopNavbar
					title={route.params.title}
					beforeTitleItems={[
						<FAIcons
							name={"arrow-left"}
							onPress={() => navigation.goBack()}
							key={"back"}
							size={30}
						/>,
					]}
				/>
				<EntriesList filter={route.params.filter} />
			</View>
		</Container>
	);
}

export default EntriesView;
