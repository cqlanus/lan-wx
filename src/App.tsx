import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
    HashRouter as Router,
    Switch,
    Route,
} from "react-router-dom"
import Home from './components/screens/Home'
import Charts from './components/screens/Charts'
import NavDrawer from './components/NavDrawer'
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
            <Switch>
                <Route exact path="/"><Home/></Route>
                <Route path="/charts"><Charts/></Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
