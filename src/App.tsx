import { useEffect, useState } from 'react';
import AdminPanel from './admin/AdminPanel';
import './App.css';
import { apiCheckToken, apiNewToken } from './dao/login';
import { apiGetDefaultRegionId } from './dao/region';
import BoxesMap from './render/BoxesMap';
import MapApp from './render/MapApp';
import { token_key } from './util/constnats';
import { RegionStateResponse, TokenResponse } from './util/types';

function App() {
  //const [tokenLoaded, setTokenLoaded] = useState<boolean>(false)
  const [route, setRoute] = useState(window.location.hash);
  const [defaultRegion, setDefaultRegion] = useState<string>();

  // function generateNewToken() {
  //   apiNewToken()
  //   .then((resp: TokenResponse) => {
  //     localStorage.setItem(token_key, resp.token)
  //     setTokenLoaded(true)
  //   })
  //   .catch((e) => {
  //     alert("Failed to create new token")
  //   }); 
  // }

  // useEffect(() => {    
  //   const token = localStorage.getItem(token_key)

  //   if(token) {
  //     apiCheckToken(token)
  //     .then((resp: TokenResponse) => {
  //       setTokenLoaded(true)
  //     })
  //     .catch(() => {
  //       generateNewToken()
  //     }); 
  //   }
  //   else {
  //     generateNewToken()
  //   }
  // },[])

  useEffect(() => {
    function handleHashChange() {
      setRoute(window.location.hash);
    }

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    apiGetDefaultRegionId()
    .then((resp: RegionStateResponse) => {
        setDefaultRegion(resp.region)
      })
      .catch(() => {
        alert("Failed fetch default region")
      });
  }, []);

  function getPage() {
    if (route === '#/admin'){
      return <AdminPanel/>
    }
    else {
      return (defaultRegion && <MapApp defaultParentRegionId={defaultRegion}/>)
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
