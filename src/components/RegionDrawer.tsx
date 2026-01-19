import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Region } from '../util/types';

export default function RegionDrawer({region, setRegion}: {region: (Region | false), setRegion: (region: Region | false) => void}) {
  const [lastRegion, setLastRegion] = useState<Region>({name: "", description: "",  vertices: [0]});
  const handleClose = () => {region && (setLastRegion(region)); setRegion(false);};

  return (
    <div>      
      <Offcanvas 
        show={!!region}
        onHide={handleClose} 
        key={1} 
        placement={"bottom"} 
        name={"bottom"}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{region ? region.name : lastRegion.name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {region ? region.description : lastRegion.description}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

