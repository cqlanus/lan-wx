import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import locationReducer from './slice/location'
import mapReducer from './slice/map'
import weatherReducer from './slice/weather'
import chartReducer from './slice/chart'
import forecastReducer from './slice/forecast'
import climateReducer from './slice/climate'
import pwsReducer from './slice/pws'

export const store = configureStore({
  reducer: {
      counter: counterReducer,
      location: locationReducer,
      map: mapReducer,
      weather: weatherReducer,
      chart: chartReducer,
      forecast: forecastReducer,
      climate: climateReducer,
      pws: pwsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
