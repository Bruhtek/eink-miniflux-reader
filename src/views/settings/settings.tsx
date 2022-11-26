import { Text, View } from "react-native";

import { containerStyles } from "../../styles/containerStyles";
import Navbar from "../navbar/navbar";
import { Container } from "../../components/containter";

function Settings() {
	return (
		<Container>
			<View style={containerStyles.contentContainer}>
				<Text>Settings</Text>
			</View>
			<View style={containerStyles.navbarContainer}>
				<Navbar selected={2} />
			</View>
		</Container>
	);
}

export default Settings;
