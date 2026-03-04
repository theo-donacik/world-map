import axios from "axios";
import { getAuthHeader } from "../util/constnats";
import { Area } from "../util/types";

const API_BASE = process.env.REACT_APP_API_BASE
const AREA_API = API_BASE+'/area'

export async function apiGetAreas() {
  const r = await axios.get(AREA_API);
  return r.data;
}

export async function apiEditArea(
  area: Partial<Area>
) {
  const r = await axios.post(AREA_API + '/edit', {
    id: area._id,
    area: area
  }, getAuthHeader());
  return r.data;
}

export async function apiDeleteArea(
  id: string
) {
  const r = await axios.post(AREA_API + '/delete', {
    id: id,
  }, getAuthHeader());
  return r.data;
}

export async function apiAddInterest(
  id: string,
  token: string
) {
  const r = await axios.post(AREA_API + '/interest', {
    id: id,
    token: token
  });
  return r.data;
}


export async function apiCreateArea(
  area: Area
) {
  const {_id, ...areaNoId} = area;
  const r = await axios.post(AREA_API, areaNoId, getAuthHeader());
  return r.data;
}