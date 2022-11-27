import {
	PressableProps,
	StyleProp,
	Text,
	Pressable,
	TextProps,
	ViewProps,
} from "react-native";

import { buttonStyles } from "../styles/styles";

function Button(props: ButtonProps) {
	return (
		<Pressable
			style={({ pressed }) => [
				pressed ? buttonStyles.pressablePressed : null,
				props.pressableStyle,
				buttonStyles.pressable,
			]}
			onPress={props.onPress}
		>
			{({ pressed }) => (
				<Text
					style={[
						pressed ? buttonStyles.textPressed : null,
						props.textStyle,
						buttonStyles.text,
					]}
				>
					{props.text}
				</Text>
			)}
		</Pressable>
	);
}

type ButtonProps = {
	pressableStyle?: StyleProp<any>;
	textStyle?: StyleProp<any>;
	text: string;

	onPress: () => void;
};

export default Button;
