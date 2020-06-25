import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import { composeWithDevTools } from "redux-devtools-extension";

import createReducer from "../reducers";

const configureStore = preloadedState => {
    const store = createStore(
        createReducer(),
        preloadedState,
        composeWithDevTools(
            applyMiddleware(thunk, createLogger(), reduxImmutableStateInvariant())
        )
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept("../reducers", () => {
            const nextRootReducer = require("../reducers").default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
};

export default configureStore;
