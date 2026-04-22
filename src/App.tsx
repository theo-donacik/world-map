import { useEffect, useState } from 'react';
import AdminPanel from './admin/AdminPanel';
import './App.css';
import { apiGetDefaultRegionId } from './dao/region';
import OauthCallback from './oauth/OauthCallback';
import MapApp from './render/MapApp';
import { RegionStateResponse } from './util/types';

function App() {
  const [route, setRoute] = useState(window.location.hash);
  const [defaultRegion, setDefaultRegion] = useState<string>();

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
    else if (route.includes('#/oauth')){
      return <OauthCallback/>
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
