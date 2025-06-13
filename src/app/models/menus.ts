export interface Menu {
  _id: Id
  name: string
  image: string
  price: string
  description: string
}

export interface Id {
  $oid: string
}