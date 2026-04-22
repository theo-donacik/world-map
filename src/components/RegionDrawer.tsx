import { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { apiRegionAddInterest } from '../dao/region';
import { Region, TokenResponse } from '../util/types';
import DiscordModal from './DiscordModal';

export default function RegionDrawer({region, onClose, userToken}: {region: (Region | false), onClose: () => void, userToken: string | false}) {
  const [lastRegion, setLastRegion] = useState<Partial<Region>>({name: "", description: ""});
  const [showDCLogin, setShowDCLogin] = useState<boolean>(false)
  const [userIntersted, setUserInterested] = useState<boolean>(false)

  const handleClose = () => {region && (setLastRegion(region)); onClose();};

  useEffect(() => {
    if((region && userToken)){
      setUserInterested(region.interestedUsers.includes(userToken))
      setShowDCLogin(false)
    }
  }, [region, userToken])


  function handleInterest() {
    if(userIntersted) return;
    
    if(region && userToken) {
      apiRegionAddInterest(region._id, userToken).then((resp: TokenResponse) => {
        setUserInterested(true)
      })
    }
    else {
      setShowDCLogin(true)
    }
  }

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
          <button
            className={'btn btn-primary interest-btn ' + (userIntersted ? "success" : "")}
            onClick={handleInterest}
          >
            {userIntersted ?  "Interest noted" : "I'm Interested"  }
          </button>
        </Offcanvas.Body>
      </Offcanvas>
      <DiscordModal show={showDCLogin} setShow={setShowDCLogin}/>
    </div>
  );
}

