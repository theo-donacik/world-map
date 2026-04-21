import { useEffect, useState } from 'react';
import { Form, Stack } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { apiCreateExistingRegion, apiEditRegion } from '../dao/region';
import { Region, RegionResponse } from "../util/types";
import CreateSubregionModal from './CreateSubregionModal';

export default function EditRegionBox({region, setRegion}: {region: Region, setRegion: (regionId: string) => void }) {
  const [modalShow, setModalShow] = useState(false);
  const [editState, setEditState] = useState<number>(0)
  const [currentRegion, setCurrentRegion] = useState<Region>(region);

  useEffect(() => {
    setCurrentRegion(region)
  }, [region])


  function handleEdit() {
    if(currentRegion.name === "" || currentRegion.description === "") {
      setEditState(1)
      setTimeout(() => setEditState(0), 3000)
      return 
    }

    apiEditRegion(currentRegion)
      .then(() => {
        setEditState(2)
        setTimeout(() => setEditState(0), 3000)
      })
      .catch(() => {
        alert("Failed to update region")
      });
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
        <div>
          Interested Users: {currentRegion.interestedUsers.length}
        </div>
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
    </Card>
  )
}