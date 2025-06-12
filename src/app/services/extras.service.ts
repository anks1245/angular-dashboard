import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Extras } from '../models/extras';

@Injectable({
  providedIn: 'root'
})
export class ExtrasService {

  constructor(private httpClient: HttpClient) { }

  getProducts(limit:number, skip:number, search: string): Observable<Extras>{
    let q = `https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,price,tags,ratings`
    if(search != ''){
      q = `https://dummyjson.com/products/search?limit=${limit}&skip=${skip}&select=title,price,tags,ratings&q=${search}`
    }
    return this.httpClient.get<Extras>(q)
  }

}
