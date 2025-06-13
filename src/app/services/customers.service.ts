import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customers';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

    constructor(private http: HttpClient) {}

    
    
    // getCustomersMini() {
    //     return Promise.resolve(this.getData().slice(0, 5));
    // }

    // getCustomersSmall() {
    //     return Promise.resolve(this.getData().slice(0, 10));
    // }

    // getCustomersMedium() {
    //     return Promise.resolve(this.getData().slice(0, 50));
    // }

    // getCustomersLarge() {
    //     return Promise.resolve(this.getData().slice(0, 200));
    // }

    getAllCustomers(): Observable<Customer[]> {
        return this.http.get<Customer[]>("https://05eae2dd-047b-4d4d-9390-5474f821cff8.mock.pstmn.io/customers")
    }

    // getCustomers(params?: any) {
    //     return this.http.get<any>('https://www.primefaces.org/data/customers', { params: params }).toPromise();
    // }
}
