import axios from "axios";
import { getAuthHeader } from "../util/constnats";
import { Region } from "../util/types";

const API_BASE = process.env.REACT_APP_API_BASE
const REGION_API = API_BASE+'/region'
const REGION_STATE_API = API_BASE+'/state/region'


export async function apiGetRegion(id: string) {
  const r = await axios.get(REGION_API+`/${id}`);
  return r.data;
}

export async function apiCreateExistingRegion(id: string, backgroundName: string, colorMapName: string, dataCSVName: string) {
  const r = await axios.post(REGION_API+`/create/${id}`, {
    colorMapName: colorMapName,
    backgroundMapName: backgroundName,
    dataCSVName: dataCSVName
  }, getAuthHeader());
  return r.data;
}

export async function apiCreateNewRegion(backgroundName: string, colorMapName: string, dataCSVName: string) {
  console.log("sending", backgroundName, colorMapName, dataCSVName)
  const r = await axios.post(REGION_API+`/create`, {
    backgroundMapName: backgroundName,
    colorMapName: colorMapName,
    dataCSVName: dataCSVName
  }, getAuthHeader());
  return r.data;
}

export async function apiEditRegion(
  region: Partial<Region>
) {
  const r = await axios.post(REGION_API + '/edit', {
    id: region._id,
    region: region
  }, getAuthHeader());
  return r.data;
}

export async function apiDeleteRegion(id: string) {
  const r = await axios.post(REGION_API + '/delete', {
    id: id,
  }, getAuthHeader());
  return r.data;
}

export async function apiGetDefaultRegionId() {
  const r = await axios.get(REGION_STATE_API);
  return r.data;
}

export async function apiSetDefaultRegionId(id: string) {
  const r = await axios.post(REGION_STATE_API, {
    region: id
  }, getAuthHeader());
  return r.data;
}