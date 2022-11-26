import { Text, View } from "react-native";

import { containerStyles } from "../../styles/containerStyles";
import Navbar from "../navbar/navbar";
import { Container } from "../../components/containter";

function Home() {
	return (
		<Container>
			<View style={containerStyles.contentContainer}>
				<Text>Home</Text>
			</View>
			<View style={containerStyles.navbarContainer}>
				<Navbar selected={0} />
			</View>
		</Container>
	);
}

export default Home;
