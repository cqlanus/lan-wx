import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
    HashRouter as Router,
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
import { getCurrentLocation } from './redux/slice/location'
import './App.css';

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCurrentLocation())
    }, [dispatch])
  return (
      <div className="App">
          <Router>
              <NavDrawer/>
              <LocationSearch/>
              <Switch>
                  <Route exact path="/"><Redirect to="/home/current"/></Route>
                  <Route exact path="/home/:type"><Home/></Route>

                  <Route exact path="/charts"><Redirect to="/charts/upperair"/></Route>
                  <Route path="/charts/:chartType"><Charts/></Route>

                  <Route exact path="/forecast"><Redirect to="/forecast/details"/></Route>
                  <Route path="/forecast/:forecastType"><Forecast/></Route>

                  <Route exact path="/climate"><Redirect to="/climate/norms"/></Route>
                  <Route path="/climate/:climateType"><Climate/></Route>

                  <Route exact path="/map"><MapScreen /></Route>
              </Switch>
          </Router>
      </div>
  );
}

export default App;
