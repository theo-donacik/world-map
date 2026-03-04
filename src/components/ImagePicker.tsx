import { Form } from "react-bootstrap";

export default function ImagePicker({file, setFile}: {file: File | undefined, setFile: (f: File)=>void}) {
  const allowedExtentions = [".png", ".jpg", ".jpeg"]
  
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {    
    const files = e.target.files;

    if (files && files.length > 0) {
      const fileExt = '.' + files[0].name.split('.').pop();

      if(fileExt && allowedExtentions.includes(fileExt)) {
        setFile(files[0]);
      }
      else {
        alert("File must have image extension")
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