import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../models/menus';

@Injectable({
  providedIn: 'root'
})
export class MenusService {

  constructor(private httpClient: HttpClient) { }

  getMenu(): Observable<Menu[]>{
    return this.httpClient.get<Menu[]>("https://05eae2dd-047b-4d4d-9390-5474f821cff8.mock.pstmn.io/menus")
  }
}
