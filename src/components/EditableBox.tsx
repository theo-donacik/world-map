import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { apiCreateArea, apiEditArea } from '../dao/area';
import { Area, AreaResponse } from "../util/types";

export default function EditableBox({area}: {area: Area}) {
  const [name, setName] = useState<string>(area.name)
  const [desc, setDesc] = useState<string>(area.description)
  const [link, setLink] = useState<string>(area.inviteLink)
  const [editState, setEditState] = useState<number>(0)

  function editArea() {
    console.log(name, desc, link)
    if(name === "" || desc === "" || link === "") {
      setEditState(1)
    }
    else if (area._id === "0"){
      apiCreateArea(area)
      .then((resp: AreaResponse) => {
          setEditState(2)
          setTimeout(() => setEditState(0), 5000)
        })
        .catch(() => {
          setEditState(1)
          setTimeout(() => setEditState(0), 5000)
        });
    }
    else {
      apiEditArea({name: name, description: desc, inviteLink: link, _id: area._id})
      .then((resp: AreaResponse) => {
          setEditState(2)
          setTimeout(() => setEditState(0), 5000)
        })
        .catch(() => {
          setEditState(1)
          setTimeout(() => setEditState(0), 5000)
        });
    }
  }

  return (
    <Card>
      <Card.Img variant="top" src={""}/>
      <Card.Body>
        <Form.Control
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /> 
        <Form.Control
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <Form.Control
          placeholder="Invite Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button
          className={'edit-btn ' + (editState === 0 ? "" : editState === 1 ? "err" : "good")}
          onClick={editArea}
        >
          {editState === 0 ? "Save" : editState === 1 ? "Inputs cannot be blank" : "Saved!"}
        </button>
      </Card.Body>
    </Card>
  )
}