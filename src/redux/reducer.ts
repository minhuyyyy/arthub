import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
export const reducer = combineReducers({
    users: userReducer,
});
