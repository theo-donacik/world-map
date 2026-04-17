import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE
const AREA_API = API_BASE+'/region'

export async function apiGetRegion(id: string) {
  const r = await axios.get(AREA_API+`/${id}`);
  return r.data;
}