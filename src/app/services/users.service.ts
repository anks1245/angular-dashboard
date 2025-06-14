import { Injectable } from '@angular/core';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  get(): Users[]{
    if(localStorage.getItem("users")){
      return JSON.parse(localStorage.getItem("users")!) as Users[]
    }else{
      return []
    }
  }

  getByEmailandPass(email: string, password: string): Users | null{
    if(localStorage.getItem("users")){
        const users = JSON.parse(localStorage.getItem("users")!) as Users[]
        const user = users.find(v=>v.email == email && v.password == password) as Users
        // console.log(isAuth.length)
        if(user){
          localStorage.setItem("isLoggedIn", "true")
          return user
        }else{
          return null
        }
      }else{
        return null
      }
  }

  add(user: Users):boolean {
    if(localStorage.getItem("users")){
        let users = JSON.parse(localStorage.getItem("users")!) as Users[]
        // let duplicateUsers = []

        for (let i = 0; i < users.length; i++) {
          if(users[i].email == user.email){
            return false
          }
        }

        user.id = users[users.length-1].id + 1
        
        users = [...users, user]
        localStorage.setItem("users", JSON.stringify(users))
        return true
      }else{

        localStorage.setItem("users", JSON.stringify([{...user, ...{id: 1}}]))
        return true
      }
  }

  update(user:Users){
    if(localStorage.getItem("users")){
        const users = JSON.parse(localStorage.getItem("users")!) as Users[]
        const index = users.findIndex(u=>u.id === user.id)
        users[index] = {...users[index], ...user}
        console.log(index, users[index], user);
        
        localStorage.setItem("users",JSON.stringify(users))
        return true
     }else{
        return false
     }
  }

  delete(user:Users):boolean{
     if(localStorage.getItem("users")){
        const users = JSON.parse(localStorage.getItem("users")!) as Users[]
        const updatedUsers = users.filter(u => u.id !== user.id);
        if(updatedUsers.length == 0){
          return false;
        }
        localStorage.setItem("users", JSON.stringify(updatedUsers))
        return true
     }else{
        return false
     }
  }
}
