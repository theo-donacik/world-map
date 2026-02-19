import { useEffect, useRef, useState } from 'react';
import AdminPanel from './admin/AdminPanel';
import './App.css';
import { apiCheckToken, apiNewToken } from './dao/login';
import BoxesMap from './render/BoxesMap';
import { token_key } from './util/constnats';
import { TokenResponse } from './util/types';

function App() {
  const hasMounted = useRef<boolean>(false);
  const [tokenLoaded, setTokenLoaded] = useState<boolean>(false)

  function generateNewToken() {
    apiNewToken()
    .then((resp: TokenResponse) => {
      localStorage.setItem(token_key, resp.token)
      setTokenLoaded(true)
    })
    .catch(() => {
      alert("Failed to create new token")
    }); 
  }

  useEffect(() => {
    if(hasMounted.current) {
      const token = localStorage.getItem(token_key)

      if(token) {
        apiCheckToken(token)
        .then((resp: TokenResponse) => {
          setTokenLoaded(true)
        })
        .catch(() => {
          generateNewToken()
        }); 
      }
      else {
        generateNewToken()
      }
    }
    else {
      hasMounted.current = true;
    }

  },[])

  function getPage() {
    if (window.location.pathname === '/world-map' || window.location.pathname === '/world-map/'){
      //return <MapApp/>
      {tokenLoaded && <BoxesMap/>}
    }
    else if (window.location.pathname === '/world-map/admin'){
      return <AdminPanel/>
    }
    else {
      return(
        <text>Page not found</text>
      );
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {getPage()}
      </header>
    </div>
  );
}

export default App;
