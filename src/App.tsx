import { useEffect, useRef, useState } from 'react';
import AdminPanel from './admin/AdminPanel';
import './App.css';
import { apiCheckToken, apiNewToken } from './dao/login';
import BoxesMap from './render/BoxesMap';
import { token_key } from './util/constnats';
import { TokenResponse } from './util/types';

function App() {
  const [tokenLoaded, setTokenLoaded] = useState<boolean>(false)

  function generateNewToken() {
    apiNewToken()
    .then((resp: TokenResponse) => {
      localStorage.setItem(token_key, resp.token)
      setTokenLoaded(true)
    })
    .catch((e) => {
      alert("Failed to create new token")
    }); 
  }

  useEffect(() => {
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
    

  },[])

  function getPage() {
    if (window.location.hash === '#/admin'){
      return <AdminPanel/>
    }
    else {
      //<MapApp/>
      return (tokenLoaded && <BoxesMap/>)
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
