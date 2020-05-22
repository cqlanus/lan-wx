import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Home from './components/screens/Home'
import { getCurrentLocation } from './redux/slice/location'
import './App.css';

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCurrentLocation())
    }, [dispatch])
  return (
    <div className="App">
        <Home/>
    </div>
  );
}

export default App;
