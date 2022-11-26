import { containerStyles } from "../styles/styles";
import { View, Text } from "react-native";
import FAIcons from "@expo/vector-icons/FontAwesome";

function LoadingView() {
	return (
		<View style={containerStyles.centeringContainer}>
			<Text style={{ marginBottom: 20 }}>Loading...</Text>
			<FAIcons name={"rotate-right"} size={50} />
		</View>
	);
}

export default LoadingView;
