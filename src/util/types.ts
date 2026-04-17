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

export type RegionResponse = {
  subregions: Region[]
  parent: Region
}

export type RegionStateResponse = {
  region: string
}

export type Area = {
  _id: string
  name: string;
  description: string;
  inviteLink: string;
  interestedUsers: string[];
  fileKey?: string | null | undefined
}

export type Region = {
  _id: string
  name: string
  description: string
  vertices: number[]
  parentId: string
  interestedUsers: string[]
  subregionImg?: string | null | undefined
  subregionWidth?: number | null | undefined
  subregionHeight?: number | null | undefined
}

export type DcChannel = {
  name: string,
  id: string
}