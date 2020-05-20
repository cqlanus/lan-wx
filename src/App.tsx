import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import MapCard from './components/MapCard'
import { getCurrentLocation } from './redux/slice/location'
import './App.css';

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCurrentLocation())
    }, [dispatch])
  return (
    <div className="App">
        <MapCard/>
    </div>
  );
}

export default App;
