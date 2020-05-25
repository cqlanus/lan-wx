import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import locationReducer from './slice/location'
import mapReducer from './slice/map'
import weatherReducer from './slice/weather'
import chartReducer from './slice/chart'

export const store = configureStore({
  reducer: {
      counter: counterReducer,
      location: locationReducer,
      map: mapReducer,
      weather: weatherReducer,
      chart: chartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
