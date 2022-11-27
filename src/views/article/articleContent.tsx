import {
	ScrollView,
	View,
	useWindowDimensions,
	TouchableWithoutFeedback,
	GestureResponderEvent,
} from "react-native";
import RenderHTML from "react-native-render-html";
import { useRef, useState } from "react";

function ArticleContent(props: ArticleContentProps) {
	const width = useWindowDimensions().width;
	const height = useWindowDimensions().height;

	const ref = useRef<ScrollView>(null);
	const [contentHeight, setContentHeight] = useState(0);
	const [page, setPage] = useState(0);

	const scrollToPage = (page: number) => {
		const safeHeight = height - 200;
		const maxPage = Math.floor(contentHeight / safeHeight);
		if (page > maxPage) {
			setPage(maxPage);
			page = maxPage;
		}
		if (page < 0) {
			setPage(0);
			page = 0;
		}
		ref.current?.scrollTo({
			x: 0,
			y: safeHeight * page,
			animated: false,
		});
	};

	function handleTouch(event: GestureResponderEvent) {
		if (event.nativeEvent.locationX < width / 2) {
			setPage(page - 1);
			scrollToPage(page - 1);
		} else {
			setPage(page + 1);
			scrollToPage(page + 1);
		}
	}

	return (
		<ScrollView ref={ref} scrollEnabled={false}>
			<TouchableWithoutFeedback onPress={handleTouch}>
				<View
					style={{ padding: 20 }}
					onLayout={(e) =>
						setContentHeight(e.nativeEvent.layout.height)
					}
				>
					<RenderHTML
						ignoredDomTags={["iframe"]}
						source={{ html: props.content }}
						contentWidth={width}
					/>
				</View>
			</TouchableWithoutFeedback>
		</ScrollView>
	);
}

type ArticleContentProps = {
	content: string;
};

export default ArticleContent;
