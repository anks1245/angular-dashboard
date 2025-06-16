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
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, FloatLabelModule, ButtonModule, PasswordModule, InputTextModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  
  formGroup!: FormGroup;
  router = inject(Router);
  userService = inject(UsersService)

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

      // localStorage.setItem("isLoggedIn","true")
      this.userService.getByEmailandPass(formValues.email, formValues.password).subscribe({
        next:(data)=>{
          if (data){
            localStorage.setItem("isLoggedIn","true")
            this.router.navigate(['/dashboard'],{ replaceUrl: true })

          }else
            alert("Invalid Credentials")
        },
        error:(err)=>{
          console.log("Login error",err);
          
        }
      })
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
