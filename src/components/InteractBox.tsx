import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { apiAddInterest } from '../dao/area';
import { apiGetImage } from '../dao/files';
import { Area, TokenResponse } from '../util/types';

export default function InteractBox({area, userToken}: {area: Area, userToken: string}) {
  const [userIntersted, setUserInterested] = useState<boolean>(area.interestedUsers.includes(userToken))
  const [imageSrc, setImageSrc] = useState<string>("")
  
  useEffect(() => {
    area.fileKey && apiGetImage(area.fileKey).then((resp: File) => {
      setImageSrc(URL.createObjectURL(resp))
    })
  }, [area])

  function imInterested() {
    if(!userIntersted) {
      apiAddInterest(area._id, userToken)
      .then((resp: TokenResponse) => {
          setUserInterested(true)
        })
        .catch(() => {
          alert("Failed to update interest state")
        });
    }
  }
  
  return (
    <Card>
      {imageSrc !== "" && (<Card.Img variant="top" src={imageSrc}/>)}  
      <Card.Body>
        <Card.Title className="fs-2">{area.name}</Card.Title>
        <Card.Text className="fs-5">{area.description}</Card.Text>
        <button
         className={'btn btn-primary interest-btn ' + (userIntersted ? "success" : "")}
        onClick={imInterested}>
          {userIntersted ?  "Interest noted" : "I'm Interested"  }
        </button>
      </Card.Body>
    </Card>
  )
}