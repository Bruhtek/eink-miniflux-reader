import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator";
import { containerStyles } from "../../styles/containerStyles";
import TopNavbar from "../../components/topNavbar";
import { Container } from "../../components/containter";
import { View } from "react-native";
import FAIcons from "@expo/vector-icons/FontAwesome";
import ArticleContent from "./articleContent";

type Props = NativeStackScreenProps<RootStackParamList, "Article">;

function ArticleView({ route, navigation }: Props) {
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
				<ArticleContent content={route.params.content} />
			</View>
		</Container>
	);
}

export default ArticleView;
