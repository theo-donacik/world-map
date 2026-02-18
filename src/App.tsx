import AdminPanel from './admin/AdminPanel';
import './App.css';
import BoxesMap from './render/BoxesMap';
import MapApp from './render/MapApp';

function App() {

  function getPage() {
    console.log(window.location)
    if (window.location.pathname === '/world-map'){
      //return <MapApp/>
      return <BoxesMap/>
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
