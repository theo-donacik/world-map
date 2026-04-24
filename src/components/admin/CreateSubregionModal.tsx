import { useState } from "react";
import { Modal } from "react-bootstrap";
import { apiUploadFile } from "../../dao/files";
import { FileKeyResponse, FileType } from "../../util/types";
import FilePicker from "./FilePicker";

export default function CreateSubregionModal({show, setShow, onSave, title}: {show: boolean, setShow: (show: boolean) => void, onSave: (background: string, colorMap: string, dataCSV: string) => void, title: string}) {
  const [background, setBackground] = useState<File | undefined>()
  const [colorMap, setColorMap] = useState<File | undefined>()
  const [dataCSV, setDataCSV] = useState<File | undefined>()
  const [uploadError, setUploadError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  function handleSave() {
    if(background && colorMap && dataCSV) {
      setIsLoading(true)
      apiUploadFile(background).then((backgroundKey: FileKeyResponse) => {
        apiUploadFile(colorMap).then((colorMapKey: FileKeyResponse) => {
          apiUploadFile(dataCSV).then((dataCSV: FileKeyResponse) => {
            onSave(backgroundKey.key, colorMapKey.key, dataCSV.key)
          })
        })
      })
      .catch(() => {
        alert("Failed to upload file(s)!")
      })
    }
    else {
      setUploadError(true)
      setTimeout(() => setUploadError(false), 3000)
    }
  }

  return (
    <Modal
        show={show}
        onHide={() => {setShow(false); setIsLoading(false)}}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Background Image: <FilePicker setFile={setBackground} type={FileType.Image}/></div>
          <div>Color Map Image: <FilePicker setFile={setColorMap} type={FileType.Image}/></div>
          <div>
            Linker CSV: 
            <FilePicker setFile={setDataCSV} type={FileType.CSV}/>
            <a href="map.csv" download="sample">
              <button className="btn btn-primary">Download Sample CSV</button>
            </a>
          </div>
        </Modal.Body>
        {isLoading ? 
        <Modal.Footer>Uploading...</Modal.Footer> : 
        <Modal.Footer>
          <button className={"btn-primary btn " + (uploadError ? "failure" : "")} onClick={handleSave}>
            {uploadError ? "Missing File" : "Save"}
          </button>
          <button className="btn failure" onClick={() => {setShow(false)}}>Cancel</button>
        </Modal.Footer>}
      </Modal>
  )

}