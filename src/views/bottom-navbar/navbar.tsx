import { View } from "react-native";

import { navbarStyles } from "../../styles/navbarStyles";
import Navitem from "./navitem";
import { useEffect } from "react";

import type { NavitemProps } from "./navitem";

function Navbar(props: NavbarProps) {
	const navItems: NavitemProps[] = [
		{
			title: "Home",
			iconName: "home",
			navigateTo: "Home",
		},
		{
			title: "Feeds",
			iconName: "rss",
			navigateTo: "Feeds",
		},
		{
			title: "Settings",
			iconName: "gear",
			navigateTo: "Settings",
		},
	];

	return (
		<View style={navbarStyles.navContainer}>
			{navItems.map((el, index) => {
				if (index == props.selected) {
					return (
						<Navitem
							title={el.title}
							iconName={el.iconName}
							navigateTo={el.navigateTo}
							key={index}
							selected={true}
						/>
					);
				}
				return (
					<Navitem
						title={el.title}
						iconName={el.iconName}
						navigateTo={el.navigateTo}
						key={index}
					/>
				);
			})}
		</View>
	);
}

type NavbarProps = {
	selected: number;
};

export default Navbar;
