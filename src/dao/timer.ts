import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE
const TIMER_API = API_BASE+'/timer'

export async function apiSetTimer(
  timer: Date
) {
  const r = await axios.post(TIMER_API, {
    timer: timer
  });
  return r.data;
}

export async function apiGetTimer() {
  const r = await axios.get(TIMER_API);
  return r.data;
}