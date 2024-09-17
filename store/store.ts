import { configureStore } from '@reduxjs/toolkit';
import { tableReducer } from './table-slice';

export const store = configureStore({
  reducer: {
    tableReducer: tableReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
