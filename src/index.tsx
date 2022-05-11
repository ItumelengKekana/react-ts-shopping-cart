import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import ContextProvider from "./Context/Context";

const client = new QueryClient();

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

//Added context provider as a wrapper
root.render(
	<ContextProvider>
		<QueryClientProvider client={client}>
			<App />
		</QueryClientProvider>
	</ContextProvider>
);
