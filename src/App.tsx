import React, { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import Amplify, { Hub } from "aws-amplify"
import { useDispatch, useSelector, } from 'react-redux'
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route,
} from "react-router-dom"

import Home from './components/screens/Home'
import Charts from './components/screens/Charts'
import Forecast from './components/screens/Forecast'
import Climate from './components/screens/Climate'
import MapScreen from './components/screens/Map'
import NavDrawer from './components/NavDrawer'
import LocationSearch from './components/LocationSearch'
import Settings from './components/screens/Settings'
import PWS from './components/screens/PWS'
import Model from './components/screens/Model'
import Astronomy from './components/screens/Astronomy'

import { getAuthUser } from './redux/slice/auth'
import { getCurrentLocation } from './redux/slice/location'
import { setTheme } from './redux/slice/user'
import { selectTheme } from './redux/selectors'

import light from './themes/light'
import dark from './themes/dark'
import GlobalStyles from './themes/global'
import './App.css';
import 'toastr/build/toastr.css'

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

function App() {
    const dispatch = useDispatch()
    const themeStr = useSelector(selectTheme)
    const theme = themeStr === 'light' ? light : dark
    const setUserTheme = () => {
        if ( window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ) {
            dispatch(setTheme('light'))
        }
    }
    useEffect(() => {
        setUserTheme()
        dispatch(getCurrentLocation())
        dispatch(getAuthUser())
      Hub.listen('auth', (data: any) => {
        const { payload } = data
        if (payload.event === 'signIn') {
          dispatch(getAuthUser())
        }
      })
    }, [dispatch])

  return (
      <ThemeProvider theme={theme}>
          <GlobalStyles/>
          <div className="App">
              <Router>
                  <NavDrawer/>
                  <LocationSearch/>
                  <Switch>
                      <Route exact path="/"><Redirect to="/home/current"/></Route>
                      <Route exact path="/home/:type"><Home/></Route>

                      <Route exact path="/charts"><Redirect to="/charts/upperair"/></Route>
                      <Route path="/charts/:chartType"><Charts/></Route>

                      <Route exact path="/forecast"><Redirect to="/forecast/discussion"/></Route>
                      <Route path="/forecast/:forecastType"><Forecast/></Route>

                      <Route exact path="/climate"><Redirect to="/climate/norms"/></Route>
                      <Route path="/climate/:climateType"><Climate/></Route>

                      <Route exact path="/map"><MapScreen /></Route>
                      <Route exact path="/settings"><Settings /></Route>

                      <Route exact path="/pws"><Redirect to="/pws/current"/></Route>
                      <Route path="/pws/:pwsType"><PWS /></Route>

                      <Route exact path="/model"><Redirect to="/model/gfs"/></Route>
                      <Route path="/model/:modelType"><Model /></Route>

                      <Route exact path="/astronomy"><Redirect to="/astronomy/times"/></Route>
                      <Route path="/astronomy/:astroType"><Astronomy /></Route>
                  </Switch>
              </Router>
          </div>    
      </ThemeProvider>
      
  );
}

export default App
