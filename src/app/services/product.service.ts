import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  get(): Observable<Product[]>{
      return this.httpClient.get<Product[]>("http://localhost:3000/products")
  }

  add(product: Product): Observable<Product>{
      return this.httpClient.post<Product>("http://localhost:3000/products", product)
  }

  update(product: Product){
    const id = product.id
    delete product.id
    return this.httpClient.put<Product>(`http://localhost:3000/products/${id}`, product)
  }
}
