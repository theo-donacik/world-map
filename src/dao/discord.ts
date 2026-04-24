import axios from "axios";
import { getAuthHeader } from "../util/constnats";
import { DcChannel } from "../util/types";

const API_BASE = process.env.REACT_APP_API_BASE
const DISCORD_STATE_API = API_BASE+'/state/discord'
const DISCORD_LOGIN_API = API_BASE+'/discord'


export async function apiGetOrganizeChannel() {
  const r = await axios.get(DISCORD_STATE_API + '/organize');
  return r.data;
}

export async function apiGetUpdateChannel() {
  const r = await axios.get(DISCORD_STATE_API + '/updates');
  return r.data;
}

export async function apiSetOrganizeChannel(
  channel: DcChannel
) {
  const r = await axios.post(DISCORD_STATE_API + '/organize', {
    channelId: channel.id,
    channelName: channel.name,
  }, getAuthHeader());
  return r.data;
}

export async function apiSetUpdatesChannel(
  channel: DcChannel
) {
  const r = await axios.post(DISCORD_STATE_API + '/updates', {
    channelId: channel.id,
    channelName: channel.name,
  }, getAuthHeader());
  return r.data;
}


export async function apiGetAllThreadChannels() {
  const r = await axios.get(DISCORD_STATE_API + '/threadChannels', getAuthHeader());
  return r.data;
}

export async function apiGetAllTextChannels() {
  const r = await axios.get(DISCORD_STATE_API + '/textChannels', getAuthHeader());
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

export async function apiSetMessage(
  message: string
) {
  const r = await axios.post(DISCORD_STATE_API + '/message', {
    alertMessage: message
  }, getAuthHeader());
  return r.data;
}

export async function apiGetMessage() {
  const r = await axios.get(DISCORD_STATE_API + '/message', getAuthHeader());
  return r.data;
}