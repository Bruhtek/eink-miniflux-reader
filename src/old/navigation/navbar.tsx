import { View, StyleSheet } from "react-native";
import NavItem from "./navItem";

function Navbar(props: NavbarProps) {
	function setTab(tab: number) {
		props.setCurrentTab(tab);
	}

	return (
		<View style={styles.navbar}>
			<NavItem
				onClick={() => setTab(0)}
				title="Home"
				iconName="home"
				selected={props.currentTab === 0}
			/>
			<NavItem
				onClick={() => setTab(1)}
				title="Feeds"
				iconName="rss"
				selected={props.currentTab === 1}
			/>
			<NavItem
				onClick={() => setTab(2)}
				title="Settings"
				iconName="gear"
				selected={props.currentTab === 2}
			/>
		</View>
	);
}

interface NavbarProps {
	currentTab: number;
	setCurrentTab: (tab: number) => void;
}

const styles = StyleSheet.create({
	navbar: {
		height: 80,
		borderTopWidth: 3,
		borderColor: "#000",
		justifyContent: "space-around",
		alignItems: "center",
		flexDirection: "row",
	},
});

export default Navbar;
