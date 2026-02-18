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

export type Area = {
  _id: string
  name: string;
  description: string;
  inviteLink: string;
}