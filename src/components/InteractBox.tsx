import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { apiAddInterest } from '../dao/area';
import { Area, TokenResponse } from '../util/types';

export default function InteractBox({area, img, userToken}: {area: Area, img: string, userToken: string}) {
  const [userIntersted, setUserInterested] = useState<boolean>(area.interestedUsers.includes(userToken))

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
      <Card.Img variant="top" src={img}/>
      <Card.Body>
        <Card.Title className="fs-2">{area.name}</Card.Title>
        <Card.Text className="fs-5">{area.description}</Card.Text>
        <button
         className={'int-btn ' + (userIntersted ? "int" : "")}
        onClick={imInterested}>
          {userIntersted ?  "Interest noted" : "I'm Interested"  }
        </button>
      </Card.Body>
    </Card>
  )
}