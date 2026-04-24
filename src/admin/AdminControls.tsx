import { useEffect, useState } from "react";
import InterestThresholdSet from "../components/admin/InterestThresholdSet";
import MessageSet from "../components/admin/MessageSet";
import NavToMainBtn from "../components/admin/NavToMainBtn";
import RegionEdit from "../components/admin/RegionEdit";
import SetTimer from "../components/admin/SetTimer";
import UpdateChannelSet from "../components/admin/UpdateChannelSet";
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
        <UpdateChannelSet />
      </div>
      <RegionEdit defaultRegionId={defaultRegion ?? ""}/>
    </div>
  );
}