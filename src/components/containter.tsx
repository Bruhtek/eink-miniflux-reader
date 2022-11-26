import { PropsWithChildren } from "react";
import { View } from "react-native";
import { containerStyles } from "../styles/containerStyles";

export function Container(props: PropsWithChildren) {
	return <View style={containerStyles.mainContainer}>{props.children}</View>;
}
