export interface Extras {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export interface Product {
  id: number
  title: string
  price: number
  tags: string[]
}
