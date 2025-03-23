import { combineReducers } from "@reduxjs/toolkit";

import { postSlice, themeSlice, userSlice} from "../redux";

const rootReducer = combineReducers({
    user: userSlice,
    theme: themeSlice,
    posts: postSlice
});


export {rootReducer};