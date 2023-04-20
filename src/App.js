import React from 'react'
import './App.css';
import {useState,useEffect,createContext} from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Main from './Main';


export const store = createContext();
function App() {
  const [token,settoken] = useState(null);
  return (
    <div className="App">
      <store.Provider value={[token, settoken]}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Main/>}/>
            
        
          </Routes>
        </BrowserRouter>
      </store.Provider>
    </div>
  );
}

export default App;
