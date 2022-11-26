import Root from "./src/root";
import { Entry, Feed } from "./src/api/interfaces";
import { useState } from "react";

import { CurrentFeedContext, CurrentEntryContext } from "./src/currentContexts";

function App() {
	const [currentFeed, setCurrentFeed] = useState<Feed | undefined>(undefined);
	const [currentEntry, setCurrentEntry] = useState<Entry | undefined>(
		undefined,
	);

	return (
		<CurrentEntryContext.Provider value={{ currentEntry, setCurrentEntry }}>
			<CurrentFeedContext.Provider
				value={{ currentFeed, setCurrentFeed }}
			>
				<Root></Root>
			</CurrentFeedContext.Provider>
		</CurrentEntryContext.Provider>
	);
}

export default App;
export { CurrentFeedContext, CurrentEntryContext };
