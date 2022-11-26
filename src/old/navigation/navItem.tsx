import { View, Pressable, StyleSheet, Text } from "react-native";
import FAIcons from "@expo/vector-icons/FontAwesome";

function NavItem(props: NavItemProps) {
	function onClick() {
		props.onClick();
	}

	return (
		<View>
			<Pressable
				style={({ pressed }) => [
					{
						backgroundColor:
							pressed || props.selected ? "black" : "white",
					},
					styles.pressable,
				]}
				onPress={onClick}
			>
				{({ pressed }) => (
					<View style={styles.innerView}>
						<FAIcons
							name={props.iconName as never}
							size={36}
							color={
								pressed || props.selected ? "white" : "black"
							}
							iconStyle={{ margin: 10 }}
						/>
						<Text
							style={[
								{
									color:
										pressed || props.selected
											? "white"
											: "black",
								},
								styles.text,
							]}
						>
							{props.title}
						</Text>
					</View>
				)}
			</Pressable>
		</View>
	);
}

interface NavItemProps {
	iconName: string;
	title: string;
	onClick: () => void;
	selected: boolean;
}

const styles = StyleSheet.create({
	pressable: {
		height: "80%",
		aspectRatio: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 5,
		borderRadius: 10,
	},
	innerView: {
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		textAlign: "center",
	},
});

export default NavItem;
