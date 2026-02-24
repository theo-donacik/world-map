import { useEffect, useState } from 'react';
import { Form, Modal, Stack } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { apiCreateArea, apiDeleteArea, apiEditArea } from '../dao/area';
import { Area, AreaResponse, OneAreaResponse } from "../util/types";

export default function EditableBox({area}: {area: Area}) {
  const [name, setName] = useState<string>(area.name)
  const [desc, setDesc] = useState<string>(area.description)
  const [link, setLink] = useState<string>(area.inviteLink)
  const [modalShow, setModalShow] = useState(false);
  const [editState, setEditState] = useState<number>(0)
  const [stateArea, setStateArea] = useState<Area | null>(area);

  useEffect(() => {
    setStateArea(area)
  }, [area])

  function editArea() {
    if(name === "" || desc === "" || link === "") {
      setEditState(1)
      setTimeout(() => setEditState(0), 3000)
    }
    else if (stateArea!._id === "0"){
      apiCreateArea({name: name, description: desc, inviteLink: link, interestedUsers: [], _id: area._id})
      .then((resp: OneAreaResponse) => {
          setStateArea(resp.area)
          setEditState(2)
          setTimeout(() => setEditState(0), 3000)
        })
        .catch(() => {
          setEditState(1)
          setTimeout(() => setEditState(0), 3000)
        });
    }
    else {
      apiEditArea({name: name, description: desc, inviteLink: link, _id: area._id})
      .then((resp: OneAreaResponse) => {
          setStateArea(resp.area)
          setEditState(2)
          setTimeout(() => setEditState(0), 3000)
        })
        .catch(() => {
          setEditState(1)
          setTimeout(() => setEditState(0), 3000)
        });
    }
  }

  function deleteArea() {
    if(stateArea){
      apiDeleteArea(stateArea._id)
      .then((resp: AreaResponse) => {
          setModalShow(false)
          setStateArea(null)
        })
        .catch(() => {
          alert("Failed to delete area")
        });
    }

  }


  return (
    stateArea &&
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

        <Stack direction="horizontal" gap={3}>
          <button
            className={'edit-btn ' + (editState === 0 ? "" : editState === 1 ? "err" : "good")}
            onClick={editArea}
          >
            {editState === 0 ? "Save" : editState === 1 ? "Inputs cannot be blank" : "Saved!"}
          </button>
          {!(stateArea!._id === "0") && 
            <button
              className={'ms-auto delete-btn'}
              onClick={() => setModalShow(true)}
            >
              Delete
            </button>
          }

        </Stack>
      </Card.Body>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Are you sure you want to delete this area?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            This cannot be undone
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => {setModalShow(false)}}>Cancel</button>
          <button 
            className='delete-btn'
            onClick={deleteArea}>
              Delete
          </button>
        </Modal.Footer>
      </Modal>
    </Card>
  )
}