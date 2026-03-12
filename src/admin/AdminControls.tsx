import { useEffect, useState } from "react";
import EditableBox from "../components/EditableBox";
import InterestThresholdSet from "../components/InterestThresholdSet";
import MessageSet from "../components/MessageSet";
import NavToMainBtn from "../components/NavToMainBtn";
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
    setAreas([...areas, {name: "", description: "", inviteLink: "", interestedUsers:[], _id: "0"}])
  }

  return (
    <div className="admin-controls">
      <NavToMainBtn/>
      <div className="admin-horizontal">
        <SetTimer/>
        <InterestThresholdSet/>
        <MessageSet/>
      </div>
      <div className="edit-boxes">
        {areas.map((area: Area) => (
          <EditableBox a={area}/>
        ))}
        <button className="btn btn-primary add-btn" onClick={newArea}>Add New Area</button>
      </div>
    </div>
  );
}