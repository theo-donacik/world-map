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

export enum FileType {
  Image,
  CSV
}

export type Region = {
  _id: string
  name: string
  description: string
  mission: string
  level: string 
  reward: string
  vertices: number[]
  parentId: string
  interestedUsers: string[]
  colorMapColor: string,
  colorMapImg?: string | null | undefined,
  subregionImg?: string | null | undefined
  subregionWidth?: number | null | undefined
  subregionHeight?: number | null | undefined,
  cooldown: Date
}

export type DcChannel = {
  name: string,
  id: string
}