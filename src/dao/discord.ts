import axios from "axios";
import { DcChannel } from "../util/types";

const API_BASE = process.env.REACT_APP_API_BASE
const CHANNEL_STATE_API = API_BASE+'/state/channel'
const CHANNEL_LIST_API = API_BASE+'/state/allChannels'

export async function apiSetChannel(
  channel: DcChannel
) {
  const r = await axios.post(CHANNEL_STATE_API, {
    channelId: channel.id,
    channelName: channel.name
  });
  return r.data;
}

export async function apiGetChannel() {
  const r = await axios.get(CHANNEL_STATE_API);
  return r.data;
}

export async function apiGetAllChannels() {
  const r = await axios.get(CHANNEL_LIST_API);
  return r.data;
}