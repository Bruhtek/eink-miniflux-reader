import { Pressable, Text, View } from "react-native";

import { navbarStyles } from "../../styles/navbarStyles";
import FAIcons from "@expo/vector-icons/FontAwesome";

import { useNavigation } from "@react-navigation/native";

function Navbar(props: NavitemProps) {
	const navigation = useNavigation();

	if (props.selected) {
		return (
			<View style={[navbarStyles.navItem, navbarStyles.navItemSelected]}>
				<FAIcons
					name={props.iconName as never}
					size={30}
					color="white"
				/>
				<Text style={navbarStyles.navTextSelected}>{props.title}</Text>
			</View>
		);
	}

	return (
		<Pressable
			// TODO: we shouldn't do this, casting as never is a very hacky way to avoid ts errors
			onPress={() => navigation.navigate(props.navigateTo as never)}
		>
			{({ pressed }) => (
				<View
					style={[
						navbarStyles.navItem,
						pressed ? navbarStyles.navItemSelected : null,
					]}
				>
					<FAIcons
						name={props.iconName as never}
						size={30}
						color={pressed ? "white" : "black"}
					/>
					<Text
						style={
							pressed ? navbarStyles.navTextSelected : undefined
						}
					>
						{props.title}
					</Text>
				</View>
			)}
		</Pressable>
	);
}

export type NavitemProps = {
	title: string;
	iconName: string;
	navigateTo: string;
	selected?: boolean;
};

export default Navbar;
