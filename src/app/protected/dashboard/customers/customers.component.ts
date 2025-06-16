import { Component, ViewChild } from '@angular/core';
import { Country, CountryOption, Customer,Representative } from '../../../models/customers';
import { Table } from 'primeng/table';
import { CustomersService } from '../../../services/customers.service';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MenuItem, MessageService, SortEvent } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DrawerModule } from 'primeng/drawer';
import { FloatLabelModule } from 'primeng/floatlabel';
import { getFieldErrorMessage } from '../../../utils/FieldErrorHandler';
import { ContextMenuModule } from 'primeng/contextmenu';

@Component({
  selector: 'app-customers',
  imports: [
    FormsModule, 
    ReactiveFormsModule, 
    TableModule, 
    TagModule, 
    IconFieldModule, 
    InputTextModule, 
    InputIconModule, 
    MultiSelectModule, 
    SelectModule, 
    HttpClientModule, 
    CommonModule, 
    ButtonModule, 
    ConfirmDialog, 
    ToastModule, 
    DrawerModule, 
    FloatLabelModule,
    ContextMenuModule
],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
  providers: [ConfirmationService, MessageService]
})

export class CustomersComponent {
    @ViewChild('dt2') dt2!: Table;
    formGroup!: FormGroup;
    customers!: Customer[];
    selectedCustomer!: Customer;
    representatives!: Representative[];
    loading: boolean = true;
    activityValues: number[] = [0, 100];
    clonedCustomer: { [s: number]: Customer } = {};
    countries!: CountryOption[]; 
    isSorted: boolean | null = null;
    initialValue!: Customer[];
    isDrawerOpen = false;
    items!: MenuItem[];

    constructor(private customerService: CustomersService,private confirmationService: ConfirmationService,private messageService: MessageService, ) {}

    ngOnInit() {
        this.customerService.getAllCustomers().subscribe({
            next: (data) => {
                this.customers = data.reverse();
                this.initialValue = [...this.customers  ]
                this.loading = false;

                this.customers.forEach((customer) => (customer.date = new Date(<Date>customer.date)));

                this.countries = data
                    .map(customer => customer.country)
                    .filter((country): country is Country => !!country)
                    .filter((value, index, self) =>
                        index === self.findIndex(c => c.code === value.code)
                    )
                    .map(country => ({
                        label: country.name ?? '',  // fallback to empty string if name is undefined
                        value: country
                    }));

                
            },
            error: (err) => {
                console.log(err);
            }
        })

        this.representatives = [
            { name: 'Amy Elsner', image: 'amyelsner.png' },
            { name: 'Anna Fali', image: 'annafali.png' },
            { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
            { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
            { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
            { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
            { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
            { name: 'Onyama Limba', image: 'onyamalimba.png' },
            { name: 'Stephen Shaw', image: 'stephenshaw.png' },
            { name: 'Xuxue Feng', image: 'xuxuefeng.png' }
        ];

        this.formGroup = new FormGroup({
            name: new FormControl('',[Validators.required]),
            country: new FormControl<Country | null>(null,[Validators.required]),
            company: new FormControl('',[Validators.required]),
            agent: new FormControl('',[Validators.required])
        })  

    }

    clear(table: Table) {
        table.clear();
    }

    confirmDelete(id: number, event: Event){
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
                console.log(id);
                this.customers = this.customers.filter(customer => customer.id !== id);
                this.messageService.add({ severity: 'error', summary: 'Confirmed', detail: 'Record deleted' });
            },
            reject: () => {
                // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            },
        });
    }

    onRowEditInit(customer: Customer) {
        this.clonedCustomer[customer.id as number] = { ...customer };
    }

    onRowEditSave(customer: Customer) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Customer record is updated' });
    }

    onRowEditCancel(customer: Customer, index: number) {
        this.customers[index] = this.clonedCustomer[customer.id as number];
        delete this.clonedCustomer[customer.id as number];
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
            this.customers = [...this.initialValue];
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

    handleAddRecord(){
        this.isDrawerOpen = true;
        this.formGroup.reset()
    }

    handleDrawerClose(){

    }

    addRecord(){
        if(this.formGroup.valid){
            const formValues = this.formGroup.value;
            console.log('Form Submitted:', formValues);
            let nextId = (this.customers[0].id ?? 0) + 1;
            
            let newCustomer: Customer = {
                "id": nextId,
                "name": formValues.name,
                "country": formValues.country,
                "company": formValues.company,
                "date": new Date().toISOString().split("T")[0],
                "status": "unqualified",
                "verified": false,
                "activity": 17,
                "representative": formValues.agent,
                "balance": 70663
            }

            this.customers = [newCustomer, ...this.customers]
            this.initialValue = [...this.customers  ]
            this.isDrawerOpen = false;
            this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Record Added' });
        }else{
            console.log('Form is invalid');
            this.formGroup.markAllAsTouched();
        }
    }

    getErrorMessage(controlName: string): string | null {
        return getFieldErrorMessage(this.formGroup,controlName)
    }
}
