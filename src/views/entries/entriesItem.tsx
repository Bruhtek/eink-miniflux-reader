import { Pressable, Text, View } from "react-native";
import { listStyles } from "../../styles/listStyles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Entry } from "../../store/minifluxSlice";

function EntryItem(props: ListItemProps) {
	const navigation = useNavigation<NativeStackNavigationProp<any>>();

	return (
		<Pressable onPress={() => navigation.push("Article", props.entry)}>
			{({ pressed }) => (
				<View
					style={[
						listStyles.listItem,
						pressed ? listStyles.listItemPressed : null,
					]}
				>
					<View style={listStyles.listItemTextContainer}>
						<Text
							numberOfLines={1}
							style={[
								listStyles.listItemTitle,
								props.status === "unread"
									? listStyles.boldText
									: null,
							]}
						>
							{props.title}
						</Text>
						{props.subtitle ? (
							<Text
								numberOfLines={1}
								style={listStyles.listItemSubtitle}
							>
								{props.subtitle}
							</Text>
						) : null}
					</View>
				</View>
			)}
		</Pressable>
	);
}

type ListItemProps = {
	title: string;
	subtitle?: string;
	status: "read" | "unread" | "removed";
	entry: Entry;
};

export default EntryItem;
