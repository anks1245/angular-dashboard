import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ExtrasService } from '../../../services/extras.service';
import { Extras, Product } from '../../../models/extras';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders',
  imports: [TableModule, PaginatorModule, InputGroupModule, InputGroupAddonModule, ButtonModule, CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit{
  extrasService = inject(ExtrasService)
  extras!: Extras
  selectedProducts!: Product;
  limit = 10
  skip = 0
  first = 0
  last = 0
  totalRecords = 0
  rows = this.limit
  loading = true
  search = ''
  options = [
        { label: 5, value: 5 },
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 120, value: 120 }
  ];

  ngOnInit(): void {
    this.getData(this.limit,this.skip, this.search)
  }

  getData(limit:number, skip:number, search: string){
    this.loading = true
    this.extrasService.getProducts(limit, skip, search).subscribe({
      next:(data)=>{
        this.loading = false
        this.extras = data
        this.totalRecords = data.total
        this.skip = data.skip
        this.first = data.skip
        this.last = data.skip + data.limit
        this.rows = data.limit
      },
      error:(err)=>{
        this.loading = false
        console.log("error",err)
      }
    })
  }

   onPageChange(event: PaginatorState) {
        this.first = event.first ?? 0;
        this.rows = event.rows ?? 10;
        console.log("hit", this.first, this.rows);
        this.getData(this.rows, this.first, this.search)
    }

  searchData(){
    this.getData(this.rows, this.first, this.search)
  }
   

}
