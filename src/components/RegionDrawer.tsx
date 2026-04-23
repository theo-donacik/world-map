import { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { apiRegionAddInterest } from '../dao/region';
import { Region, TokenResponse } from '../util/types';
import DiscordModal from './DiscordModal';
import RegionDescription from './RegionDescription';

export default function RegionDrawer({region, onClose, userToken, onMarkInterest}: {region: (Region | false), onClose: () => void, userToken: string | false, onMarkInterest: ()=>void}) {
  const [lastRegion, setLastRegion] = useState<Region>();
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
        onMarkInterest()
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
          <Offcanvas.Title><b style={{fontSize: '30px'}}>{region ? region.mission : (lastRegion && lastRegion.mission)}</b></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {region ? 
          <RegionDescription region={region} interested={userIntersted} handleInterest={handleInterest}/> :
          (lastRegion && <RegionDescription region={lastRegion} interested={userIntersted} handleInterest={() => {}}/>)}
        </Offcanvas.Body>
      </Offcanvas>
      <DiscordModal show={showDCLogin} setShow={setShowDCLogin}/>
    </div>
  );
}

