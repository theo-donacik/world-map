import axios from "axios";
import { getAuthHeader } from "../util/constnats";
import { DcChannel } from "../util/types";

const API_BASE = process.env.REACT_APP_API_BASE
const CHANNEL_STATE_API = API_BASE+'/state/channel'
const CHANNEL_LIST_API = API_BASE+'/state/allChannels'
const DISCORD_LOGIN_API = API_BASE+'/discord'


export async function apiSetChannel(
  channel: DcChannel
) {
  const r = await axios.post(CHANNEL_STATE_API, {
    channelId: channel.id,
    channelName: channel.name,
  }, getAuthHeader());
  return r.data;
}

export async function apiGetChannel() {
  const r = await axios.get(CHANNEL_STATE_API);
  return r.data;
}

export async function apiGetAllChannels() {
  const r = await axios.get(CHANNEL_LIST_API, getAuthHeader());
  return r.data;
}

export async function apiGetToken(code: string) {
  const r = await axios.get(DISCORD_LOGIN_API + `/session?code=${code}`,);
  return r.data;
}

export async function apiCheckToken(token: string) {
  const r = await axios.post(DISCORD_LOGIN_API + "/validate",{
    token: token
  });
  return r.data;
}

export async function apiValidateAdminToken(token: string) {
  const r = await axios.post(DISCORD_LOGIN_API + '/validateAdmin', {
    token: token 
  });
  return r.data;
} 