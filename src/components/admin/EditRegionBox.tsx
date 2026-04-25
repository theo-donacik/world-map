import { useEffect, useState } from 'react';
import { Col, Form, Modal, Row, Stack } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { apiCreateExistingRegion, apiEditRegion, apiRegionFailure, apiRegionSuccess } from '../../dao/region';
import { Region, RegionResponse } from "../../util/types";
import CreateSubregionModal from './CreateSubregionModal';

export default function EditRegionBox({region, setRegion}: {region: Region, setRegion: (regionId: string) => void }) {
  const [modalShow, setModalShow] = useState(false);
  const [updateModalShow, setUpdateModalShow] = useState<string | false>(false);
  const [editState, setEditState] = useState<number>(0)
  const [succeedState, setSucceedState] = useState<boolean>(false)
  const [failState, setFailState] = useState<boolean>(false)
  const [cooldownDays, setCooldownDays] = useState<number>(region.cooldown ? Math.ceil((new Date(region.cooldown).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0)
  const [currentRegion, setCurrentRegion] = useState<Region>(region);

  useEffect(() => {
    setCurrentRegion(region)
    console.log(new Date(region.cooldown).getMilliseconds())
  }, [region])


  function handleEdit() {
    if(currentRegion.name === "" || currentRegion.description === "") {
      setEditState(1)
      setTimeout(() => setEditState(0), 3000)
      return 
    }

    const regionWithCooldown = {...currentRegion, cooldown: addDays(cooldownDays)}

    apiEditRegion(regionWithCooldown)
      .then(() => {
        setEditState(2)
        setTimeout(() => setEditState(0), 3000)
      })
      .catch(() => {
        alert("Failed to update region")
      });
  }

  function saveCooldown() {
    apiEditRegion({_id: currentRegion._id, cooldown: addDays(cooldownDays)})
      .then(() => {
        
      })
      .catch(() => {
        alert("Failed to update region")
      });
  }

  function handleRegionSuccess() {
    apiRegionSuccess(currentRegion._id)
    .then(() => {
      setSucceedState(true)
      setTimeout(() => setSucceedState(false), 3000)
      setUpdateModalShow(false)

      saveCooldown()
    })
    .catch(() => {
      alert("Failed to update region status")
    })
  }


  function handleRegionFailure() {
    apiRegionFailure(currentRegion._id)
    .then(() => {
      setFailState(true)
      setTimeout(() => setFailState(false), 3000)
      setUpdateModalShow(false)

      saveCooldown()
    })
    .catch(() => {
      alert("Failed to update region status")
    })
  }

  async function handleSubregionSave(background: string, colorMap: string, dataCSV: string) {
    apiCreateExistingRegion(currentRegion._id, background, colorMap, dataCSV)
      .then((resp: RegionResponse) => {
        setModalShow(false)
        setRegion(resp.parent._id)
      })
      .catch(() => {
        alert("Failed to create region")
      });
  }

  function addDays(days: number) {
    const result = new Date();
    result.setDate(result.getDate() + days);
    return result;
  }

  return (
    <Card>
      <Card.Body>
        <Form.Control
          placeholder="Name"
          value={currentRegion.name}
          onChange={(e) => setCurrentRegion({...currentRegion, name: e.target.value})}
        /> 
        <Form.Control
          placeholder="Description"
          value={currentRegion.description}
          onChange={(e) => setCurrentRegion({...currentRegion, description: e.target.value})}
        />
         <Row style={{fontSize: "15px", padding: "20px", textAlign: "left", alignContent: "center"}}>
          <Col md={5}>Cooldown ends in</Col>
          <Col md={4}>
            <Form.Control
              placeholder="Days"
              type="number"
              min={0}
              value={cooldownDays}
              width="50px"
              onChange={(e) => setCooldownDays((Number)(e.target.value) ?? 0)}
            />
          </Col>
          <Col md={2}>days</Col>
        </Row>
        <div style={{fontSize: "18px", paddingBottom: "20px"}}>
          Interested Users: {currentRegion.interestedUsers.length}
        </div>
        <Stack direction="horizontal" gap={3} style={{marginBottom: "10px"}}>
          <button
            className={'btn btn-primary ' + (failState ? "success" : "")}
            onClick={() => setUpdateModalShow("failure")}
          >
            {failState ? "Failed!" : "Failed?"}
          </button>
          
          <button
            className={'btn btn-primary ms-auto ' + (succeedState ? "success" : "")}
            onClick={() => setUpdateModalShow("success")}
          >
            {succeedState ? "Succeeded!" : "Succeeded?"}
          </button>

        </Stack>
        <Stack direction="horizontal" gap={3}>
          <button
            style={{backgroundColor: `rgb(${currentRegion.colorMapColor})`}}
            className={'btn btn-primary ' + (editState === 0 ? "" : editState === 1 ? "failure" : "success")}
            onClick={handleEdit}
          >
            {editState === 0 ? "Save" : editState === 1 ? "Inputs cannot be blank" : "Saved!"}
          </button>
          {region.subregionImg ? 
          <button
            className={'btn btn-primary ms-auto'}
            onClick={() => {setRegion(region._id)}}
          >
            Edit Sub-region
          </button> : 
          <button
            className={'btn btn-primary ms-auto'}
            onClick={() => {setModalShow(true)}}
          >
            Add Sub-region
          </button>}
        </Stack>
      </Card.Body>

      <CreateSubregionModal title={"Create new subregion"} show={modalShow} setShow={setModalShow} onSave={handleSubregionSave}/>

      <Modal
        show={!!updateModalShow}
        onHide={() => {setUpdateModalShow(false)}}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Send a notification?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This will notify the updates channel of the completion of this mission and set a cooldown until it can be attempted again
        </Modal.Body>
        <Modal.Footer>
          <button className={"btn-primary btn"} onClick={updateModalShow === "success" ? handleRegionSuccess : handleRegionFailure}>
            Send Notification
          </button>
          <button className="btn failure" onClick={() => {setUpdateModalShow(false)}}>Cancel</button>
        </Modal.Footer>
      </Modal>
          
    </Card>
  )
}