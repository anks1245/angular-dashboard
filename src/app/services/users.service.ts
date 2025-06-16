import { Injectable } from '@angular/core';
import { Users } from '../models/users';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  get(): Observable<Users[]>{
    // if(localStorage.getItem("users")){
    //   return JSON.parse(localStorage.getItem("users")!) as Users[]
    // }else{
    //   return []
    // }
    return this.httpClient.get<Users[]>("http://localhost:3000/users")
  }

  getByEmailandPass(email: string, password: string): Observable<Users>{
    // if(localStorage.getItem("users")){
    //     const users = JSON.parse(localStorage.getItem("users")!) as Users[]
    //     const user = users.find(v=>v.email == email && v.password == password) as Users
    //     // console.log(isAuth.length)
    //     if(user){
    //       localStorage.setItem("isLoggedIn", "true")
    //       return user
    //     }else{
    //       return null
    //     }
    //   }else{
    //     return null
    //   }
    return this.httpClient.get<Users>(`http://localhost:3000/users?email=${email}&password=${password}`)
  }

  add(user: Users) {
    // if(localStorage.getItem("users")){
    //     let users = JSON.parse(localStorage.getItem("users")!) as Users[]
    //     // let duplicateUsers = []

    //     for (let i = 0; i < users.length; i++) {
    //       if(users[i].email == user.email){
    //         return false
    //       }
    //     }

    //     user.id = users[users.length-1].id + 1
        
    //     users = [...users, user]
    //     localStorage.setItem("users", JSON.stringify(users))
    //     return true
    //   }else{

    //     localStorage.setItem("users", JSON.stringify([{...user, ...{id: 1}}]))
    //     return true
    //   }

    return this.httpClient.post(`http://localhost:3000/users`, user)
  }

  update(user:Users){
    // if(localStorage.getItem("users")){
    //     const users = JSON.parse(localStorage.getItem("users")!) as Users[]
    //     const index = users.findIndex(u=>u.id === user.id)
    //     users[index] = {...users[index], ...user}
    //     console.log(index, users[index], user);
        
    //     localStorage.setItem("users",JSON.stringify(users))
    //     return true
    //  }else{
    //     return false
    //  }
    console.log(user);
    
    return this.httpClient.put(`http://localhost:3000/users/${user.id}`, user)
  }

  delete(user:Users){
    //  if(localStorage.getItem("users")){
    //     const users = JSON.parse(localStorage.getItem("users")!) as Users[]
    //     const updatedUsers = users.filter(u => u.id !== user.id);
    //     if(updatedUsers.length == 0){
    //       return false;
    //     }
    //     localStorage.setItem("users", JSON.stringify(updatedUsers))
    //     return true
    //  }else{
    //     return false
    //  }
    return this.httpClient.delete(`http://localhost:3000/users/${user.id}`)
  }
}
