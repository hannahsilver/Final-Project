import React from "react";
import ReactDOM from "react-dom";

import { UserProvider } from "./components/context/UserContext";
import { SignUpProvider } from "./components/context/SignUpContext";
import App from "./components/App";

import configureStore from "./store";

import { Provider } from "react-redux";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <UserProvider>
        <SignUpProvider>
          <App />
        </SignUpProvider>
      </UserProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
