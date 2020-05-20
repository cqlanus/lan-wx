import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import locationReducer from './slice/location'
import mapReducer from './slice/map'
import weatherReducer from './slice/weather'

export const store = configureStore({
  reducer: {
      counter: counterReducer,
      location: locationReducer,
      map: mapReducer,
      weather: weatherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
