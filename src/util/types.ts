export type Region = {
  name: string;
  description: string;
  vertices: [number]
}

export type AreaResponse = {
  areas: [Area]
}

export type TimerResponse = {
  timer: Date
}

export type AllChannelsResponse = {
  channels: DcChannel[]
}

export type ChannelResponse = {
  channel: DcChannel
}

export type Area = {
  _id: string
  name: string;
  description: string;
  inviteLink: string;
}

export type DcChannel = {
  name: string,
  id: string
}