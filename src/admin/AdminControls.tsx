import { useEffect, useState } from "react";
import InterestThresholdSet from "../components/InterestThresholdSet";
import MessageSet from "../components/MessageSet";
import NavToMainBtn from "../components/NavToMainBtn";
import RegionEdit from "../components/RegionEdit";
import SetTimer from "../components/SetTimer";
import { apiGetAreas } from "../dao/area";
import { apiGetDefaultRegionId } from "../dao/region";
import { Area, AreaResponse, RegionStateResponse } from "../util/types";

export default function AdminControls() {
  //const [areas, setAreas] = useState<Area[]>([]);
  const [defaultRegion, setDefaultRegion] = useState<string>();

  useEffect(() => {
    // apiGetAreas()
    //   .then((resp: AreaResponse) => {
    //     setAreas(resp.areas)
    //   })
    //   .catch(() => {
    //     alert("Failed fetch areas")
    //   });
    apiGetDefaultRegionId().then((resp: RegionStateResponse) => {
      setDefaultRegion(resp.region)
    })
  }, []);

  // function newArea() {
  //   setAreas([...areas, {name: "", description: "", inviteLink: "", interestedUsers:[], _id: "0"}])
  // }

  if(!defaultRegion) {
    <div>loading...</div>
  }

  return (
    <div className="admin-controls">
      <div className="boxes-header">
        <NavToMainBtn/>
      </div>
      <div className="admin-horizontal">
        <SetTimer/>
        <InterestThresholdSet/>
        <MessageSet/>
      </div>
      <RegionEdit defaultRegionId={defaultRegion ?? ""}/>
    </div>
  );
}