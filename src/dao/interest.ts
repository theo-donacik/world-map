import axios from "axios";
import { getAuthHeader } from "../util/constnats";

const API_BASE = process.env.REACT_APP_API_BASE
const INTEREST_NUM_API = API_BASE+'/state/interest'

export async function apiSetInterest(
  interestNum: number
) {
  const r = await axios.post(INTEREST_NUM_API, {
    interestNum: interestNum
  }, getAuthHeader());
  return r.data;
}

export async function apiGetInterest() {
  const r = await axios.get(INTEREST_NUM_API, getAuthHeader());
  return r.data;
}