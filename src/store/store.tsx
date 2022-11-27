import { configureStore } from "@reduxjs/toolkit";
import minifluxSlice from "./minifluxSlice";

const store = configureStore({
	reducer: {
		miniflux: minifluxSlice,
	},
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
