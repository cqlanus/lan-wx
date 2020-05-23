import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Home from './components/screens/Home'
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
        <NavDrawer/>
        <Home/>
    </div>
  );
}

export default App;
