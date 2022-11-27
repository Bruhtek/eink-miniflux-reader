import { Text, View } from "react-native";

import { containerStyles } from "../../styles/containerStyles";
import Navbar from "../bottom-navbar/navbar";
import { Container } from "../../components/containter";
import TopNavbar from "../../components/topNavbar";

import FilterSelector from "./filterSelector";

import EntriesList from "../entries/entriesList";
import { useState } from "react";

function Home() {
	const filters = ["All", "Unread", "Read", "Removed"];
	const [filter, setFilter] = useState("Unread");

	const filterTag = (): string | undefined => {
		if (filter === "All") {
			return undefined;
		}
		return filter.toLowerCase();
	};

	return (
		<Container>
			<View style={containerStyles.contentContainer}>
				<TopNavbar title={"Home"} />
				<FilterSelector
					values={filters}
					selected={filter}
					onSelect={setFilter}
				/>
				<EntriesList
					filter={{
						status: filterTag() as
							| "read"
							| "unread"
							| "removed"
							| undefined,
					}}
				/>
			</View>
			<View style={containerStyles.navbarContainer}>
				<Navbar selected={0} />
			</View>
		</Container>
	);
}

export default Home;
