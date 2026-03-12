import { useEffect, useState } from 'react';
import { Form, Modal, Stack } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { apiCreateArea, apiDeleteArea, apiEditArea } from '../dao/area';
import { apiGetImage, apiUploadImage } from '../dao/files';
import { Area, AreaResponse, FileKeyResponse, OneAreaResponse } from "../util/types";
import ImagePicker from './ImagePicker';

export default function EditableBox({a}: {a: Area}) {
  const [modalShow, setModalShow] = useState(false);
  const [editState, setEditState] = useState<number>(0)
  const [area, setArea] = useState<Area>(a);
  const [areaDeleted, setAreaDeleted] = useState<boolean>(false);
  const [file, setFile] = useState<File | undefined>()

  useEffect(() => {
    if(a.fileKey) {
      apiGetImage(a.fileKey).then((resp: File) => {
        setFile(resp)
      })
    }
  }, [a])
  
  useEffect(() => {
  }, [file])

  function handleSave() {
    if(area.name === "" || area.description === "" || area.inviteLink === "") {
      setEditState(1)
      setTimeout(() => setEditState(0), 3000)
      return 
    }

    if(file && file.name) {
      apiUploadImage(file).then((resp: FileKeyResponse) => {
        editArea({...area, fileKey: resp.key})
      })
      .catch(() => {
        alert("Failed to upload file!")
      })
    }
    else {
      editArea(area)
    }
  }


  function editArea(area: Area) {
    if (area._id === "0"){  
      apiCreateArea(area)
      .then((resp: OneAreaResponse) => {
          setArea(resp.area)
          setEditState(2)
          setTimeout(() => setEditState(0), 3000)
        })
        .catch(() => {
          setEditState(1)
          setTimeout(() => setEditState(0), 3000)
        });
    }
    else {
      apiEditArea(area)
      .then((resp: OneAreaResponse) => {
          setArea(resp.area)
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
    if(area._id !== "0"){
      apiDeleteArea(area._id)
      .then((resp: AreaResponse) => {
          setModalShow(false)
          setAreaDeleted(true)
        })
        .catch(() => {
          alert("Failed to delete area")
        });
    }
  }

  return (
    areaDeleted ? <></> : 
    <Card>
      <Card.Img variant="top" src={file ? URL.createObjectURL(file) : undefined}/>
      <ImagePicker file={file} setFile={setFile}/>
      <Card.Body>
        <Form.Control
          placeholder="Name"
          value={area.name}
          onChange={(e) => setArea({...area, name: e.target.value})}
        /> 
        <Form.Control
          placeholder="Description"
          value={area.description}
          onChange={(e) => setArea({...area, description: e.target.value})}
        />
        <Form.Control
          placeholder="Invite Link"
          value={area.inviteLink}
          onChange={(e) => setArea({...area, inviteLink: e.target.value})}
        />

        <Stack direction="horizontal" gap={3}>
          <button
            className={'btn btn-primary ' + (editState === 0 ? "" : editState === 1 ? "failure" : "success")}
            onClick={handleSave}
          >
            {editState === 0 ? "Save" : editState === 1 ? "Inputs cannot be blank" : "Saved!"}
          </button>
          {!(area._id === "0") && 
            <button
              className={'btn btn-primary ms-auto failure'}
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
          <button className="btn btn-primary" onClick={() => {setModalShow(false)}}>Cancel</button>
          <button 
            className='btn btn-primary failure'
            onClick={deleteArea}>
              Delete
          </button>
        </Modal.Footer>
      </Modal>
    </Card>
  )
}