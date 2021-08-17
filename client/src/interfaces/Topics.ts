export interface ITopic {
  userid: number,
  title: string,
  text: string,
  closed: boolean,
  parentid: number
}

export interface ITopicResp extends ITopic {
  "id": number,
  "created_at": string,
  "updated_at": string
}