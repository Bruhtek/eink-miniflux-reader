import { Text, View, Image, Pressable } from "react-native";
import { listStyles } from "../../styles/listStyles";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { tryGetFeedIcon } from "../../store/minifluxSlice";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

function FeedItem(props: ListItemProps) {
	const dispatch = useAppDispatch();
	const navigation = useNavigation<NativeStackNavigationProp<any>>();
	const icon = useAppSelector(
		(state) => state.miniflux.feeds[props.feedId].icon_data,
	);

	useEffect(() => {
		if (icon === "data:null") {
			dispatch(tryGetFeedIcon(props.feedId));
		}
	}, [icon]);

	return (
		<Pressable
			onPress={() =>
				navigation.push("Entries", {
					title: props.title,
					filter: { feedId: props.feedId },
				})
			}
		>
			{({ pressed }) => (
				<View
					style={[
						listStyles.listItem,
						pressed ? listStyles.listItemPressed : null,
					]}
				>
					<View style={listStyles.listItemIconContainer}>
						<Image
							source={{ uri: icon }}
							style={listStyles.listItemIcon}
						/>
					</View>
					<View style={listStyles.listItemTextContainer}>
						<Text style={listStyles.listItemTitle}>
							{props.title}
						</Text>
						{props.subtitle ? (
							<Text style={listStyles.listItemSubtitle}>
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
	feedId: string;

	title: string;
	subtitle?: string;

	/// icon in the form of a function that returns `data:uri` or `url`
	iconFunction?: () => void;
};

export default FeedItem;
