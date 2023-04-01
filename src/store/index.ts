import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import thunk from "redux-thunk";
import { AuthReducer } from "../components/auth/authReducer";

export const rootReducer = combineReducers({
    auth:AuthReducer
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: [thunk]
});