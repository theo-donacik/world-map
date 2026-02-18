import Card from 'react-bootstrap/Card';

export default function InteractBox({areaName, areaDesc, img}: {areaName: string, areaDesc: string, img: string}) {
  return (
    <Card>
      <Card.Img variant="top" src={img}/>
      <Card.Body>
        <Card.Title className="fs-2">{areaName}</Card.Title>
        <Card.Text className="fs-5">{areaDesc}</Card.Text>
        <button style={{fontSize: 16, marginTop: "auto"}}>I'm Interested</button>
      </Card.Body>
    </Card>
  )
}