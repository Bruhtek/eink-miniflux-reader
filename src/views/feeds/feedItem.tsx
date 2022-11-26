import { Text, View } from "react-native";
import { listStyles } from "../../styles/listStyles";

function FeedItem(props: ListItemProps) {
	return (
		<View style={listStyles.listItem}>
			<View style={listStyles.listItemIcon}></View>
			<View style={listStyles.listItemTextContainer}>
				<Text style={listStyles.listItemTitle}>{props.title}</Text>
				{props.subtitle ? (
					<Text style={listStyles.listItemSubtitle}>
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
	icon?: string;
};

export default FeedItem;
