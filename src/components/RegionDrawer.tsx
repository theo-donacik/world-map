import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Region } from '../util/types';

export default function RegionDrawer({region, onClose}: {region: (Region | false), onClose: () => void}) {
  const [lastRegion, setLastRegion] = useState<Partial<Region>>({name: "", description: ""});
  const handleClose = () => {region && (setLastRegion(region)); onClose();};

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

