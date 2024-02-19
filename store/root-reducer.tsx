import { userReducer } from "./user/reducer";;
import { combineReducers } from "@reduxjs/toolkit";

export default combineReducers({ userReducer })