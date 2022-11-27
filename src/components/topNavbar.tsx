import { View, Text } from "react-native";
import { ReactNode } from "react";

import { topNavbarStyles } from "../styles/topNavbarStyles";

function TopNavbar(props: TopNavbarProps) {
	let beforeTitle: ReactNode = null;
	if (props.beforeTitleItems) {
		beforeTitle = (
			<View style={topNavbarStyles.beforeTitleContainer}>
				{props.beforeTitleItems}
			</View>
		);
	}

	let rightItems: ReactNode = null;
	if (props.rightItems) {
		rightItems = (
			<View style={topNavbarStyles.rightItemsContainer}>
				{props.rightItems}
			</View>
		);
	}

	return (
		<View style={topNavbarStyles.container}>
			{beforeTitle}
			<Text style={topNavbarStyles.titleText}>{props.title}</Text>
			{rightItems}
		</View>
	);
}

type TopNavbarProps = {
	beforeTitleItems?: ReactNode[];
	title: string;
	rightItems?: ReactNode[];
};

export default TopNavbar;
