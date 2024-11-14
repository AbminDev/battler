import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./containers";
import "./i18n/config";
import { ScrollProvider } from "./utils/ScrollContext";
import {Provider} from "react-redux";
import {persistor, store} from "./app/store";
import {PersistGate} from "redux-persist/integration/react";

if (typeof window !== "undefined" && window.matchMedia && !window.matchMedia("(prefers-color-scheme: dark)").addEventListener) {
  const matchMediaPrototype = Object.getPrototypeOf(window.matchMedia("(prefers-color-scheme: dark)"));

  matchMediaPrototype.addEventListener = function(event: string, callback: (e: Event) => void) {
    if (event === "change") {
      this.addListener(callback);
    }
  };

  matchMediaPrototype.removeEventListener = function(event: string, callback: (e: Event) => void) {
    if (event === "change") {
      this.removeListener(callback);
    }
  };
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
  <PersistGate persistor={persistor} loading={null} >
  <ScrollProvider>
    <App />
  </ScrollProvider>
  </PersistGate>
  </Provider>
);
