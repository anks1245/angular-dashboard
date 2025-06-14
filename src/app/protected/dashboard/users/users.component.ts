import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DrawerModule } from 'primeng/drawer';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { getFieldErrorMessage } from '../../../utils/FieldErrorHandler';
import { PasswordModule } from 'primeng/password';
import { ConfirmationService, MessageService, SortEvent } from 'primeng/api';
import { UsersService } from '../../../services/users.service';
import { NonEditable, Users } from '../../../models/users';

@Component({
  selector: 'app-users',
  imports: [FormsModule, ReactiveFormsModule, TableModule, TagModule, IconFieldModule, InputTextModule, InputIconModule, MultiSelectModule, SelectModule, HttpClientModule, CommonModule, ButtonModule, ConfirmDialog, ToastModule, DrawerModule, FloatLabelModule, PasswordModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  providers: [ConfirmationService, MessageService]
})

export class UsersComponent {
  @ViewChild('dt2') dt2!: Table;
  addFormGroup!: FormGroup
  updateFormGroup!: FormGroup
  isAddDrawerOpen = false;
  isUpdateDrawerOpen = false
  userService = inject(UsersService)
  users!: Users[]
  isSorted: boolean | null = null;
  initialValue!: Users[];
  nonEditable!: NonEditable;

  constructor(private confirmationService: ConfirmationService,private messageService: MessageService,){
    this.getUsers()
    this.addFormGroup = new FormGroup({
      name: new FormControl('',[Validators.required]),
      age: new FormControl('',[Validators.required, Validators.min(0), Validators.max(100)]),
      address: new FormControl('',[Validators.required]),
      phone: new FormControl('',[Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)]),
      department: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)])
    })

    this.updateFormGroup = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      name: new FormControl('',[Validators.required]),
      age: new FormControl('',[Validators.required, Validators.min(0), Validators.max(100)]),
      address: new FormControl('',[Validators.required]),
      phone: new FormControl('',[Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)]),
      department: new FormControl('',[Validators.required])
    })
  }

  getUsers(){
    this.users = this.userService.get().reverse()
    this.initialValue = [...this.users]
  }

  handleAddRecord(){
    this.isAddDrawerOpen = true;
  }

  addRecord(){
    if(this.addFormGroup.valid){
      const formValues = this.addFormGroup.value;
      // console.log('Form Submitted:', formValues);
      if(this.userService.add(formValues)){
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Customer record added' });
        this.isAddDrawerOpen = false
        this.addFormGroup.reset()
        this.getUsers()
      }else{
        alert("Duplicate data found")
      }
    }else{
      console.log('Form is invalid');
      this.addFormGroup.markAllAsTouched();
    }
  }

  handleUpdate(user: Users){
    this.isUpdateDrawerOpen = true
    this.nonEditable = {email: user.email, id: user.id}
    this.updateFormGroup.patchValue(user)
  }

  updateRecord(){
    delete this.updateFormGroup.value.email
    const updatedData = {...this.updateFormGroup.value, ...this.nonEditable}
    console.log(updatedData);
    if(this.userService.update(updatedData)){
      this.messageService.add({ severity: 'success', summary: 'Message', detail: 'Record Updated' });
      this.getUsers()
      this.isUpdateDrawerOpen = false
    }else{
      this.messageService.add({ severity: 'info', summary: 'Message', detail: 'No record founds' });
    }
  }


  customSort(event: SortEvent) {
    if (this.isSorted == null || this.isSorted === undefined) {
        this.isSorted = true;
        this.sortTableData(event);
    } else if (this.isSorted == true) {
        this.isSorted = false;
        this.sortTableData(event);
    } else if (this.isSorted == false) {
        this.isSorted = null;
        this.users = [...this.initialValue];
        this.dt2.reset();
    }
  }
  
  sortTableData(event: SortEvent) {
      event.data!.sort((data1, data2) => {
          let value1 = data1[event.field!];
          let value2 = data2[event.field!];
          let result = null;
          if (value1 == null && value2 != null) result = -1;
          else if (value1 != null && value2 == null) result = 1;
          else if (value1 == null && value2 == null) result = 0;
          else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
          else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
          return event.order! * result;
      });
  }

  getErrorMessage(controlName: string): string | null {
      return getFieldErrorMessage(this.addFormGroup,controlName)
  }

  confirmDelete(user: Users, event: Event){
      this.confirmationService.confirm({
          target: event.target as EventTarget,
          message: 'Do you want to delete this record?',
          header: 'Danger Zone',
          icon: 'pi pi-info-circle',
          rejectLabel: 'Cancel',
          rejectButtonProps: {
              label: 'Cancel',
              severity: 'secondary',
              outlined: true,
          },
          acceptButtonProps: {
              label: 'Delete',
              severity: 'danger',
          },
          accept: () => {
              if(this.userService.delete(user)){
                this.getUsers()
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record deleted successfully' });
              }else{
                this.messageService.add({ severity: 'info', summary: 'Message', detail: 'No record founds' });
              }
              
          },
          reject: () => {
              // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
          },
      });
  }
}
