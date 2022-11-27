import { Text, View } from "react-native";
import { listStyles } from "../../styles/listStyles";

function EntryItem(props: ListItemProps) {
	return (
		<View style={listStyles.listItem}>
			<View style={listStyles.listItemTextContainer}>
				<Text
					numberOfLines={1}
					style={[
						listStyles.listItemTitle,
						props.status === "unread" ? listStyles.boldText : null,
					]}
				>
					{props.title}
				</Text>
				{props.subtitle ? (
					<Text numberOfLines={1} style={listStyles.listItemSubtitle}>
						{props.subtitle}
					</Text>
				) : null}
			</View>
		</View>
	);
}

type ListItemProps = {
	title: string;
	subtitle?: string;
	status: "read" | "unread" | "removed";
};

export default EntryItem;
