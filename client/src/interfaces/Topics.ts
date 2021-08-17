export interface ITopic {
  userid: number,
  title: string,
  text: string,
  closed: boolean
}

export interface ITopicResp extends ITopic {
  "id": number,
  "parentid": number,
  "created_at": string,
  "updated_at": string
}