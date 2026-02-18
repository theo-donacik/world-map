import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE
const AREA_API = API_BASE+'/area'

export async function apiGetAreas() {
  const r = await axios.get(AREA_API);
  return r.data;
}