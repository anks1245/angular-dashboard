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
  selector: 'app-registration',
  imports: [CommonModule, ReactiveFormsModule, FloatLabelModule, ButtonModule, PasswordModule, InputTextModule, RouterModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  formGroup!: FormGroup;
  router = inject(Router);
  userService = inject(UsersService)

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl('',[Validators.required]),
      age: new FormControl('',[Validators.required, Validators.min(0), Validators.max(100)]),
      address: new FormControl('',[Validators.required]),
      phone: new FormControl('',[Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)]),
      department: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)])
    })  
  }

  createAccount(){
    if(this.formGroup.valid){
      const formValues = this.formGroup.value;
      // console.log('Form Submitted:', formValues);
      
      // if(this.userService.add(formValues)){
      //   alert("User account created!")
      //   this.router.navigate(["/"])
      // }else{
      //   alert("Duplicate data found")
      // } 
      this.userService.add(formValues).subscribe({
        next:(data)=>{
            alert("User account created!")
        this.router.navigate(["/"])
        },
        error:(err)=>{
          console.log("Error ADD users", err);
        }
      })
    }else{
      console.log('Form is invalid');
      this.formGroup.markAllAsTouched();
    }
  }

  getErrorMessage(controlName: string): string | null {
    return getFieldErrorMessage(this.formGroup,controlName)
  }
}
