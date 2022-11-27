import { FlatList } from "react-native";
import { useAppSelector } from "../../hooks";
import EntryItem from "./entriesItem";
import { Entry } from "../../store/minifluxSlice";

function EntriesList(props: EntriesListProps) {
	let entries = useAppSelector((state) => state.miniflux.entries);

	if (props.filter.feedId) {
		entries = entries.filter(
			(entry) => entry.feed_id === props.filter.feedId,
		);
	}
	if (props.filter.status) {
		entries = entries.filter(
			(entry) => entry.status === props.filter.status,
		);
	}

	const subtitle = (entry: Entry) => entry.content.replace(/<[^>]*>/g, "");

	let values = Object.values(entries);
	values = values.sort((a, b) => {
		const dateA = Date.parse(a.published_at);
		const dateB = Date.parse(b.published_at);
		if (props.sortAsc) {
			return dateA - dateB;
		}
		return dateB - dateA;
	});

	return (
		<FlatList
			data={values}
			showsVerticalScrollIndicator={false}
			renderItem={({ item }) => (
				<EntryItem
					title={item.title}
					subtitle={subtitle(item)}
					status={item.status}
					entry={item}
					key={item.id}
				/>
			)}
		/>
	);
}

type EntriesListProps = {
	filter: {
		feedId?: string;
		status?: "read" | "unread" | "removed";
	};
	sortAsc?: boolean;
};

export default EntriesList;
