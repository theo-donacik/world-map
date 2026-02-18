import { useEffect, useState } from "react";
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


  return (
    <div className="admin-controls">
      <h1 className="admin-header">
        Admin Controls
      </h1>
      <SetTimer/>
      {areas.map((area: Area) => (
        <EditableBox area={area}/>
      ))}
    </div>
  );
}