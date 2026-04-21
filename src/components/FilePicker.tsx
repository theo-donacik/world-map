import { Form } from "react-bootstrap";
import { FileType } from "../util/types";

export default function FilePicker({setFile, type}: {setFile: (f: File)=>void, type: FileType}) {
  const allowedExtentions: Record<FileType, string[]> = {
    [FileType.Image]: [".png", ".jpg", ".jpeg"],
    [FileType.CSV]: [".csv"]
  }
  
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {    
    const files = e.target.files;

    if (files && files.length > 0) {
      const fileExt = '.' + files[0].name.split('.').pop();

      if(fileExt && allowedExtentions[type].includes(fileExt)) {
        setFile(files[0]);
      }
      else {
        alert("File must be the correct type")
      }
    }
  }

  return (
    <div>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Control
          type="file"
          accept={allowedExtentions.toString()}
          onChange={handleFileChange}
        />
      </Form.Group>
    </div>
  )
}