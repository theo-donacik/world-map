export type Region = {
  name: string;
  description: string;
  vertices: [number]
}

export type AreaResponse = {
  areas: [Area]
}

export type OneAreaResponse = {
  area: Area
}

export type FileKeyResponse = {
  key: string
}

export type TimerResponse = {
  timer: Date
}

export type InterestResponse = {
  interestNum: number
}

export type MessageResponse = {
  alertMessage: string
}

export type AllChannelsResponse = {
  channels: DcChannel[]
}

export type ChannelResponse = {
  channel: DcChannel
}

export type TokenResponse = {
  token: string
}

export type Area = {
  _id: string
  name: string;
  description: string;
  inviteLink: string;
  interestedUsers: string[];
  fileKey?: string | null | undefined
}

export type DcChannel = {
  name: string,
  id: string
}