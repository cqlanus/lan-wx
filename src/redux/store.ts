import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import locationReducer from './slice/location'
import mapReducer from './slice/map'
import weatherReducer from './slice/weather'
import chartReducer from './slice/chart'
import forecastReducer from './slice/forecast'
import climateReducer from './slice/climate'
import pwsReducer from './slice/pws'
import userReducer from './slice/user'
import authReducer from './slice/auth'
import modelReducer from './slice/model'

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
      user: userReducer,
      auth: authReducer,
      model: modelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
