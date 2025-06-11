import { Component, inject, OnInit } from '@angular/core';
import { FloatLabelModule } from "primeng/floatlabel"
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

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
      username: new FormControl('',[Validators.required]),
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
      console.log('Username:', formValues.username);
      console.log('Password:', formValues.password);

      localStorage.setItem("token","abd")
      this.router.navigate(['/dashboard'],{ replaceUrl: true })

    }else{
      console.log('Form is invalid');
      this.formGroup.markAllAsTouched();
    }
  }
}
