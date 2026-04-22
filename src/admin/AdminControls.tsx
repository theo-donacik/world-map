import { useEffect, useState } from "react";
import InterestThresholdSet from "../components/InterestThresholdSet";
import MessageSet from "../components/MessageSet";
import NavToMainBtn from "../components/NavToMainBtn";
import RegionEdit from "../components/RegionEdit";
import SetTimer from "../components/SetTimer";
import { apiGetDefaultRegionId } from "../dao/region";
import { RegionStateResponse } from "../util/types";

export default function AdminControls() {
  const [defaultRegion, setDefaultRegion] = useState<string>();

  useEffect(() => {
    apiGetDefaultRegionId().then((resp: RegionStateResponse) => {
      setDefaultRegion(resp.region)
    })
  }, []);


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