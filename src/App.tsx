import { useEffect, useState } from 'react';
import AdminPanel from './admin/AdminPanel';
import './App.css';
import { apiCheckToken, apiNewToken } from './dao/login';
import BoxesMap from './render/BoxesMap';
import MapApp from './render/MapApp';
import { token_key } from './util/constnats';
import { TokenResponse } from './util/types';

function App() {
  const [tokenLoaded, setTokenLoaded] = useState<boolean>(false)
  const [route, setRoute] = useState(window.location.hash);

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

  useEffect(() => {
    function handleHashChange() {
      setRoute(window.location.hash);
    }

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  function getPage() {
    if (route === '#/admin'){
      return <AdminPanel/>
    }
    else {
      return (tokenLoaded && <MapApp defaultParentRegionId='69e2724466787c2b05a6f7e4'/>)
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
