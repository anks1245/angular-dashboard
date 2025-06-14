export interface Users {
  id: number 
  name: string
  age: number
  address: string
  phone: string
  department: string
  email: string
  password: string
}

export interface NonEditable {
  id: number,
  email: string
}