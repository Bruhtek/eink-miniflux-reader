import { Text, View } from "react-native";

import { containerStyles } from "../../styles/containerStyles";
import Navbar from "../bottom-navbar/navbar";
import { Container } from "../../components/containter";
import TopNavbar from "../../components/topNavbar";

function Home() {
	return (
		<Container>
			<View style={containerStyles.contentContainer}>
				<TopNavbar title={"Home"} />
				<Text>Home</Text>
			</View>
			<View style={containerStyles.navbarContainer}>
				<Navbar selected={0} />
			</View>
		</Container>
	);
}

export default Home;
