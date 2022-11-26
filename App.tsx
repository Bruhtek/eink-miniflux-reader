import Root from "./src/index";

import { Provider } from "react-redux";
import store from "./src/store/store";

function App() {
	return (
		<Provider store={store}>
			<Root></Root>
		</Provider>
	);
}

export default App;
