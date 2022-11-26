import { CurrentEntryContext } from "../../currentContexts";
import { useContext, useEffect } from "react";
import {
	BackHandler,
	ScrollView,
	StyleSheet,
	Text,
	useWindowDimensions,
	View,
} from "react-native";
import { Entry } from "../../api/interfaces";
import RenderHTML from "react-native-render-html";

function ReaderView(props: { entry: Entry }) {
	const { currentEntry, setCurrentEntry } = useContext(CurrentEntryContext);

	useEffect(() => {
		const backAction = () => {
			setCurrentEntry(undefined);
			return true;
		};

		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			backAction,
		);
		return () => backHandler.remove();
	}, []);

	const width = useWindowDimensions().width;

	return (
		<View style={styles.entryContainer}>
			<Text style={styles.entryTitle}>{props.entry.title}</Text>
			<ScrollView>
				<RenderHTML
					source={{ html: props.entry.content }}
					contentWidth={width}
				/>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	entryTitle: {
		fontSize: 30,
		paddingBottom: 2,
		borderBottomWidth: 2,
		marginBottom: 10,
	},
	entryContainer: {
		padding: 20,
	},
});

export default ReaderView;
