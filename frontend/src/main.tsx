import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router";
import { router } from "./Route/AppRoute";
import { Provider } from "react-redux";
import { store } from "./Storee/store";

createRoot(document.getElementById("root")!).render(
<Provider store={store} >
    <RouterProvider router={router} />
</Provider>
);
