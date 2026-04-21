import axios from "axios";
import { getAuthHeader } from "../util/constnats";

const API_BASE = process.env.REACT_APP_API_BASE
const FILES_API = API_BASE+'/files'

export async function apiUploadFile(
  image: File
) {
  const formData = new FormData();
  formData.append('file', image)
  const r = await axios.post(FILES_API+'/upload', formData, getAuthHeader());
  return r.data;
}

export async function apiGetImage(
  key: string
) {
  const r = await axios.get(FILES_API+`/${key}`, {...getAuthHeader(), responseType: 'blob'}, );
  return r.data;
}