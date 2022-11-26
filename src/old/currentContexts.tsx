import { createContext } from "react";
import { Entry, Feed } from "./api/interfaces";

const CurrentFeedContext = createContext<CurrentFeedContextType>({
	currentFeed: undefined,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setCurrentFeed: () => {},
});
const CurrentEntryContext = createContext<CurrentEntryContextType>({
	currentEntry: undefined,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setCurrentEntry: () => {},
});

type CurrentFeedContextType = {
	currentFeed: Feed | undefined;
	setCurrentFeed: (feed: Feed | undefined) => void;
};
type CurrentEntryContextType = {
	currentEntry: Entry | undefined;
	setCurrentEntry: (entry: Entry | undefined) => void;
};

export { CurrentFeedContext, CurrentEntryContext };
