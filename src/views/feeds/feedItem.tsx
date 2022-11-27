import { Text, View, Image } from "react-native";
import { listStyles } from "../../styles/listStyles";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { tryGetFeedIcon } from "../../store/minifluxSlice";

function FeedItem(props: ListItemProps) {
	const dispatch = useAppDispatch();
	const icon = useAppSelector(
		(state) => state.miniflux.feeds[props.feedId].icon_data,
	);

	useEffect(() => {
		if (icon === "data:null") {
			console.log(icon);
			dispatch(tryGetFeedIcon(props.feedId));
		}
	}, [icon]);

	return (
		<View style={listStyles.listItem}>
			<View style={listStyles.listItemIconContainer}>
				<Image source={{ uri: icon }} style={listStyles.listItemIcon} />
			</View>
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
	feedId: string;

	title: string;
	subtitle?: string;

	/// icon in the form of a function that returns `data:uri` or `url`
	iconFunction?: () => void;
};

export default FeedItem;
