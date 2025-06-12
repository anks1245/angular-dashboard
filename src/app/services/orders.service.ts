import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecentOrders } from '../models/recent_orders';
import { OrderListModule } from 'primeng/orderlist';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient: HttpClient) { }

  getRecentOrders():Observable<RecentOrders[]>{
    return this.httpClient.get<RecentOrders[]>("https://05eae2dd-047b-4d4d-9390-5474f821cff8.mock.pstmn.io/recent-orders")
  }

}
