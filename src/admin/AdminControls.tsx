import { useEffect, useState } from "react";
import ChannelPicker from "../components/ChannelPicker";
import EditableBox from "../components/EditableBox";
import SetTimer from "../components/SetTimer";
import { apiGetAreas } from "../dao/area";
import { Area, AreaResponse } from "../util/types";

export default function AdminControls() {
  const [areas, setAreas] = useState<Area[]>([]);

  useEffect(() => {
    apiGetAreas()
      .then((resp: AreaResponse) => {
        setAreas(resp.areas)
      })
      .catch(() => {
        alert("Failed fetch areas")
      });
  }, []);

  function newArea() {
    setAreas([...areas, {name: "", description: "", inviteLink: "", _id: "0"}])
  }

  return (
    <div className="admin-controls">
      <div className="admin-horizontal">
        <SetTimer/>
        <ChannelPicker/>
      </div>
      <div className="edit-boxes">
        {areas.map((area: Area) => (
          <EditableBox area={area}/>
        ))}
        <button className="add-btn" onClick={newArea}>Add New Area</button>
      </div>
    </div>
  );
}