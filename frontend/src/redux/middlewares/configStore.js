import { configureStore } from "@reduxjs/toolkit";
import {rootReducer} from "../reducers/rootReducer";


const configStore = configureStore({
    reducer: rootReducer,
})

const {dispatch} = configStore;

export{configStore, dispatch};
