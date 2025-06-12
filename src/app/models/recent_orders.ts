export interface RecentOrders {
  orderId: string
  orderDate: string
  status: string
  totalAmount: number
  customer: Customer
}

export interface Customer {
  customerId: string
  name: string
}
