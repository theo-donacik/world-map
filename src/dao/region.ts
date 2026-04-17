import axios from "axios";
import { getAuthHeader } from "../util/constnats";

const API_BASE = process.env.REACT_APP_API_BASE
const REGION_API = API_BASE+'/region'
const REGION_STATE_API = API_BASE+'/state/region'


export async function apiGetRegion(id: string) {
  const r = await axios.get(REGION_API+`/${id}`);
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