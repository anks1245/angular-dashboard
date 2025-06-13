import { Component, inject, OnInit } from '@angular/core';
import { FloatLabelModule } from "primeng/floatlabel"
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { getFieldErrorMessage } from '../utils/FieldErrorHandler';
import { Users } from '../models/users';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, FloatLabelModule, ButtonModule, PasswordModule, InputTextModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  
  formGroup!: FormGroup;
  router = inject(Router);

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)])
    })  
  }
  // username = new FormControl()
  // password = new FormControl()

  login(){
    console.log("clicked");
    
    if(this.formGroup.valid){
      const formValues = this.formGroup.value;
      console.log('Form Submitted:', formValues);

      // Access individual fields if needed
      console.log('Username:', formValues.email);
      console.log('Password:', formValues.password);

      // localStorage.setItem("isLoggedIn","true")
      if(localStorage.getItem("users")){
        const users = JSON.parse(localStorage.getItem("users")!) as Users[]
        const isAuth = users.filter(v=>v.email == formValues.email && v.password == formValues.password)
        console.log(isAuth.length)
        if(isAuth.length == 1){
          localStorage.setItem("isLoggedIn", "true")
          this.router.navigate(['/dashboard'],{ replaceUrl: true })
        }else{
          alert("Invalid credentials")
        }
      }else{
        alert("Something went wrong")
      }

      

    }else{
      console.log('Form is invalid');
      this.formGroup.markAllAsTouched();
    }
  }

  navigate(path: string){
    this.router.navigate([path])
  }

  getErrorMessage(controlName: string): string | null {
    return getFieldErrorMessage(this.formGroup,controlName)
  }
}
