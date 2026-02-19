import axios from "axios";
import { Area } from "../util/types";

const API_BASE = process.env.REACT_APP_API_BASE
const AREA_API = API_BASE+'/area'

export async function apiGetAreas() {
  const r = await axios.get(AREA_API);
  return r.data;
}

export async function apiEditArea(
  area: Area
) {
  const r = await axios.post(AREA_API + '/edit', {
    id: area._id,
    area: area
  });
  return r.data;
}

export async function apiCreateArea(
  area: Area
) {
  const r = await axios.post(AREA_API, {name: area.name, description: area.description, inviteLink: area.inviteLink});
  return r.data;
}