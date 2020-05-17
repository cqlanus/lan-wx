import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import locationReducer from './slice/location'
import mapReducer from './slice/map'

export const store = configureStore({
  reducer: {
      counter: counterReducer,
      location: locationReducer,
      map: mapReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
