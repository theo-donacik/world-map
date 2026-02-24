import axios from "axios";
import { getAuthHeader } from "../util/constnats";

const API_BASE = process.env.REACT_APP_API_BASE
const MESSAGE_API = API_BASE+'/state/message'

export async function apiSetMessage(
  message: string
) {
  const r = await axios.post(MESSAGE_API, {
    alertMessage: message
  }, getAuthHeader());
  return r.data;
}

export async function apiGetMessage() {
  const r = await axios.get(MESSAGE_API, getAuthHeader());
  return r.data;
}