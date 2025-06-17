import { Component } from '@angular/core';
import { Sample } from '../../../data/sample';
import { CommonModule } from '@angular/common';
import { FormArray, FormGroup, FormsModule, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { ChipModule } from 'primeng/chip';
import { getFieldErrorMessage } from '../../../utils/FieldErrorHandler';
import { SelectChangeEvent, SelectModule } from 'primeng/select';

@Component({
  selector: 'app-analytics',
  imports: [
    CommonModule, 
    FormsModule, 
    TableModule, 
    ToastModule, 
    ButtonModule, 
    InputTextModule,
    ReactiveFormsModule,
    ChipModule,
    SelectModule
  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss',
  providers: [MessageService]
})
export class AnalyticsComponent {
    products!: Product[];
    editingRowKeys: { [key: string]: boolean } = {};
    form!: FormGroup;
    formArray!: FormArray;
    inventoryStatus = ['INSTOCK', 'OUTOFSTOCK', 'LOWSTOCK']
    productCategories = [ 'Accessories', 'Fitness', 'Clothing', 'Electronics' ]
    isAdding = false
    isEditing = false

    constructor(private productService: ProductService, private messageService: MessageService, private formBuilder: FormBuilder) {
      this.form = this.formBuilder.group({
        products: this.formBuilder.array([])
      });
    }

    ngOnInit() {
        this.getProducts()
    }

    get productsFormArray(): FormArray {
      return this.form.get('products') as FormArray;
    }

    hasEntries(obj: any): boolean {
      return obj && Object.keys(obj).length > 0;
    }

    hasEntriesWithKey(obj: any, key: string){
      return obj && Object.keys(obj).includes(key)
    }

    getProducts(){
      this.productService.get().subscribe({
        next:(data)=>{
          this.products = data.reverse();
          // const firstProductId = this.products[0]?.value.id
          // console.log("First ID:", firstProductId, typeof firstProductId); 
          const productFormGroups = this.products.map(p=>this.formBuilder.group({
            id: [p.id],
            code: [p.code, Validators.required],
            name: [p.name, Validators.required],
            description: [p.description],
            price: [p.price, [Validators.required, Validators.min(0.0)]],
            quantity: [p.quantity, [Validators.required, Validators.min(0)]],
            inventoryStatus: [p.inventoryStatus, Validators.required],
            category: [p.category, Validators.required],
            image: p.image,
            rating: p.rating
          }))

          this.formArray = this.formBuilder.array(productFormGroups);
          this.form.setControl('products', this.formArray);
          
        },
        error:(err)=>{
          console.log("ERR GET Products",err)
        }
      })
    }

    addNewProductRow(){
      const uuid = crypto.randomUUID()
      const newFormGroup = this.formBuilder.group({
        id: [uuid],
        code: ["", Validators.required],
        name: ["", Validators.required],
        description: [""],
        price: [0.0, [Validators.required, Validators.min(0.0)]],
        quantity: [0, [Validators.required, Validators.min(0)]],
        inventoryStatus: ["", Validators.required],
        category: ["", Validators.required],
        image: "",
        rating: 0
      })
      this.productsFormArray.insert(0, newFormGroup)
      this.editingRowKeys[uuid] = true
      this.isAdding = true
    }

    addProduct(){
      if(this.form.invalid){
        this.form.markAllAsTouched()
        return
      }
      // console.log(this.form.value.products)
      let arr: string[] = []
      Object.entries(this.editingRowKeys).forEach(([key,value])=>{
        if(value){
          arr.push(key)
        }
      })
      console.log(arr)
      const newlyAddedProduct = this.form.value.products.filter((p:Product)=>arr.includes(p.id!))
      console.log(newlyAddedProduct)

      newlyAddedProduct.reverse().forEach((np: Product)=>{
        delete np.id
        this.productService.add(np).subscribe({
          next:(data)=>{
            console.log(data);
            this.editingRowKeys = {}
            this.isAdding = false
            this.getProducts()
          },
          error:(err)=>{
            this.messageService.add({ severity: 'error', summary: 'Failed to add', detail: err.message })
          }
        })
      })
      
    }

    handleUpdateProduct(product: Product){
      this.isEditing = true
      this.editingRowKeys[product.id!] = true

    }

    handleStatusChange(ri: number,event: SelectChangeEvent){
      console.log(event.value)
      if(event.value == "OUTOFSTOCK"){
        const setControl = this.getFormGroup(ri).get("description")
        setControl?.setValidators(Validators.required)
        setControl?.updateValueAndValidity()
      }else{
        const removeControl = this.getFormGroup(ri).get("description")
        removeControl?.clearValidators()
        removeControl?.updateValueAndValidity()
      }
    }

    updateProduct(){
      console.log(this.form.value.products)
      if(this.form.invalid){
        this.form.markAllAsTouched()
        return
      }
      // console.log(this.form.value.products)
      let arr: string[] = []
      Object.entries(this.editingRowKeys).forEach(([key,value])=>{
        if(value){
          arr.push(key)
        }
      })
      // console.log(arr)
      const editedProducts = this.form.value.products.filter((p:Product)=>arr.includes(p.id!))
      console.log(editedProducts)

      editedProducts.reverse().forEach((ep: Product)=>{
        this.productService.update(ep).subscribe({
          next:(data)=>{
            console.log(data);
            this.editingRowKeys = {}
            this.isEditing = false
            this.getProducts()
          },
          error:(err)=>{
            this.messageService.add({ severity: 'error', summary: 'Failed to update', detail: err.message })
          }
        })
      })
    }

    handleRemoveNewlyAddedForms(ri: number, pd: Product){
      this.productsFormArray.removeAt(ri)
      delete this.editingRowKeys[pd.id!]
      if(Object.keys(this.editingRowKeys).length == 0){
        this.isAdding = false
      }
    }

    handleRemoveEditingForms(ri: number,pd: Product){
      delete this.editingRowKeys[pd.id!]
      const cloned = this.products.find(p=>p.id==pd.id)
      if(Object.keys(this.editingRowKeys).length == 0){
        this.isEditing = false
      }
      console.log(cloned);
      if(cloned){
        this.getFormGroup(ri).setValue({
        id: cloned.id,
        code: cloned.code,
        name: cloned.name,
        description: cloned.description,
        price: cloned.price,
        quantity: cloned.quantity,
        inventoryStatus: cloned.inventoryStatus,
        category: cloned.category,
        image: cloned.image,
        rating: cloned.rating,
      })
      }
      
    }

    getFormGroup(index: number): FormGroup {
      return (this.form.get('products') as FormArray).at(index) as FormGroup;
    }

    getErrorMessage(formGroup:FormGroup, controlName: string): string | null {
        return getFieldErrorMessage(formGroup,controlName)
    }
}
