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
  selector: 'app-registration',
  imports: [CommonModule, ReactiveFormsModule, FloatLabelModule, ButtonModule, PasswordModule, InputTextModule, RouterModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  formGroup!: FormGroup;
  router = inject(Router);

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
      console.log('Form Submitted:', formValues);
      if(localStorage.getItem("users")){
        let users = JSON.parse(localStorage.getItem("users")!) as Users[]
        let duplicateUsers = []

        for (let i = 0; i < users.length; i++) {
          if(users[i].email == formValues.email){
            duplicateUsers.push(users[i])
          }
        }

        console.log(duplicateUsers);
        if(duplicateUsers.length > 0){
          alert("User already exist")
          return
        }
        
        users = [...users, formValues]
        localStorage.setItem("users", JSON.stringify(users))

      }else{
        localStorage.setItem("users", JSON.stringify([formValues]))
      }
      alert("Account created")
      this.router.navigate(["/"])
    }else{
      console.log('Form is invalid');
      this.formGroup.markAllAsTouched();
    }
  }

  getErrorMessage(controlName: string): string | null {
    return getFieldErrorMessage(this.formGroup,controlName)
  }
}
