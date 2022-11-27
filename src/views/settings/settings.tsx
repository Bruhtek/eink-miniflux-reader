import { Text, View } from "react-native";

import { containerStyles } from "../../styles/containerStyles";
import Navbar from "../bottom-navbar/navbar";
import { Container } from "../../components/containter";
import TopNavbar from "../../components/topNavbar";

function Settings() {
	return (
		<Container>
			<View style={containerStyles.contentContainer}>
				<TopNavbar title={"Settings"} />
				<Text>Settings</Text>
			</View>
			<View style={containerStyles.navbarContainer}>
				<Navbar selected={2} />
			</View>
		</Container>
	);
}

export default Settings;
