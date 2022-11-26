import { StyleSheet, View, Text } from "react-native";

function Navbar(props: NavbarProps) {
	return (
		<View style={styles.navbar}>
			<View style={styles.navbarLeft}>
				<Text style={styles.headerText}>{props.title}</Text>
			</View>
			<View style={styles.navbarRight}>
				{props.rightIcons.map((icon, index) => (
					<View key={index} style={styles.iconContainer}>
						{icon}
					</View>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	navbar: {
		height: 50,
		borderBottomWidth: 3,
		borderColor: "#000",
		flexDirection: "row",
	},
	headerText: {
		fontSize: 20,
		fontWeight: "bold",
	},
	navbarLeft: {
		height: "100%",
		width: "40%",
		justifyContent: "center",
		paddingLeft: 15,
	},
	navbarRight: {
		height: "100%",
		width: "60%",
		paddingRight: 15,
		justifyContent: "center",
		alignItems: "flex-end",
	},
	iconContainer: {
		marginLeft: 10,
		aspectRatio: 1,
	},
});

interface NavbarProps {
	title: string;
	rightIcons: JSX.Element[];
}

export default Navbar;
