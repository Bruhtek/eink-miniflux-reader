import { View, Text, Pressable } from "react-native";
import { ReactNode } from "react";
import { buttonStyles } from "../../styles/styles";
import Button from "../../components/buttons";

function FilterSelector(props: FilterSelectorProps) {
	const filters: ReactNode[] = [];

	for (const filter of props.values) {
		if (filter === props.selected) {
			filters.push(
				<Button
					text={filter}
					onPress={() => props.onSelect(filter)}
					textStyle={{ color: "white" }}
					pressableStyle={{
						backgroundColor: "black",
						marginRight: 10,
					}}
				></Button>,
			);
			continue;
		}
		filters.push(
			<Button
				text={filter}
				onPress={() => props.onSelect(filter)}
				pressableStyle={{ marginRight: 10 }}
			></Button>,
		);
	}

	return (
		<View
			style={{
				flexDirection: "row",
				paddingLeft: 10,
				paddingVertical: 10,
			}}
		>
			{filters}
		</View>
	);
}

type FilterSelectorProps = {
	values: string[];
	selected: string;
	onSelect: (value: string) => void;
};

export default FilterSelector;
