import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import RootStore from "@stores/RootStore";
import { autorun } from "mobx";
import { loadState, saveState } from "@stores/localStorage";
import { storesContext } from "@stores/useStores";
import { BrowserRouter, Router } from "react-router-dom";

const initState = loadState();

const mobxStore = new RootStore(initState);

autorun(
	() => {
		console.dir(mobxStore);
		saveState(mobxStore.serialize());
	},
	{ delay: 1000 },
);
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<storesContext.Provider value={mobxStore}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</storesContext.Provider>,
);
