import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DrawerModule } from 'primeng/drawer';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { getFieldErrorMessage } from '../../../utils/FieldErrorHandler';
import { PasswordModule } from 'primeng/password';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-users',
  imports: [FormsModule, ReactiveFormsModule, TableModule, TagModule, IconFieldModule, InputTextModule, InputIconModule, MultiSelectModule, SelectModule, HttpClientModule, CommonModule, ButtonModule, ConfirmDialog, ToastModule, DrawerModule, FloatLabelModule, PasswordModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  formGroup!: FormGroup
  isDrawerOpen = false;

  constructor(){}

  handleAddRecord(){
    this.isDrawerOpen = true;
    this.formGroup.reset()
  }

  addRecord(){
        if(this.formGroup.valid){

        }else{
          console.log('Form is invalid');
          this.formGroup.markAllAsTouched();
        }
      }

  getErrorMessage(controlName: string): string | null {
      return getFieldErrorMessage(this.formGroup,controlName)
  }
}
