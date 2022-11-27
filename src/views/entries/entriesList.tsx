import { View, Text } from "react-native";
import { listStyles } from "../../styles/listStyles";
import { useAppSelector } from "../../hooks";
import EntryItem from "./entriesItem";
import { Entry } from "../../store/minifluxSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator";

type Props = NativeStackScreenProps<RootStackParamList, "Entries">;

function EntriesList({ route, navigation }: Props) {
	let entries = useAppSelector((state) => state.miniflux.entries);

	console.log(entries.length);

	if (route.params.filter.feedId) {
		entries = entries.filter(
			(entry) => entry.feed_id === route.params.filter.feedId,
		);
	}
	if (route.params.filter.status) {
		entries = entries.filter(
			(entry) => entry.status === route.params.filter.status,
		);
	}

	const subtitle = (entry: Entry) => entry.content.replace(/<[^>]*>/g, "");

	return (
		<View style={listStyles.listContainer}>
			<Text>{route.params.filter.feedId}</Text>
			{entries.map((entry) => (
				<EntryItem
					title={entry.title}
					subtitle={subtitle(entry)}
					key={entry.id}
				/>
			))}
		</View>
	);
}

export default EntriesList;
