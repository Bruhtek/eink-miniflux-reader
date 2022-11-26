import { View, Text } from "react-native";
import FAIcons from "@expo/vector-icons/FontAwesome";
import { containerStyles } from "../../styles/containerStyles";

function LoadingView() {
	return (
		<View style={containerStyles.centeringContainer}>
			<Text style={{ marginBottom: 20 }}>Loading...</Text>
			<FAIcons name={"rotate-right"} size={50} />
		</View>
	);
}

export default LoadingView;
