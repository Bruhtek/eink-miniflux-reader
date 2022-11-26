import { View, Text, StyleSheet, Pressable } from "react-native";
import { Entry } from "../../api/interfaces";
import { useContext, useEffect } from "react";
import { CurrentEntryContext } from "../../currentContexts";

function EntriesView(props: { entry: Entry }) {
	const { currentEntry, setCurrentEntry } = useContext(CurrentEntryContext);

	return (
		<Pressable onPress={() => setCurrentEntry(props.entry)}>
			<View style={styles.feedContainer}>
				<View style={styles.textContainer}>
					<Text numberOfLines={1} style={styles.titleText}>
						{props.entry.title.trim()}
					</Text>
					<Text style={styles.secondaryText}>
						{props.entry.content
							.replace(/<[^>]*>/g, "")
							.substring(0, 100)
							.trim() + "..."}
					</Text>
				</View>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	feedContainer: {
		borderBottomWidth: 1,
		borderColor: "#000",
		width: "100%",
		padding: 10,
		height: 55,
		flexDirection: "row",
		alignItems: "center",
	},
	textContainer: {
		flexDirection: "column",
	},
	icon: {
		aspectRatio: 1,
		height: "90%",
		marginRight: 8,
	},
	titleText: {
		padding: 0,
		margin: 0,
	},
	secondaryText: {
		color: "#888",
		padding: 0,
		margin: 0,
	},
});

export default EntriesView;
