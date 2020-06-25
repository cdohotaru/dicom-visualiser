import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import createReducer from "../reducers";

const configureStore = preloadedState => {
    const store = createStore(
        createReducer(),
        preloadedState,
        applyMiddleware(thunk)
    );
    return store;
};

export default configureStore;