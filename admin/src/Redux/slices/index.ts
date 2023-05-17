import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './auth';

export * from './auth';
export * from './booking';
export * from './car';
export * from './user';

const rootReducer = combineReducers({
    auth: authSlice.reducer,
});

export default rootReducer;
