import { SupplierService } from './../../../../core/services/supplier.service';
import { CategoryService } from './../../../../core/services/category.service';
import { Supplier } from './../../../../core/models/Supplier/supplier';
import { AdminService } from './../../../../core/services/admin.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/Category/category';
import { ResponseDto } from 'src/app/core/models/responseDto';
import { ProductShowDto } from 'src/app/core/models/Product/productShowDto';
import { ProductParentCreateDto } from 'src/app/core/models/Product/productParentCreateDto';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit{
  public file: any = {};
  createFrom = this.formBuilder.group({
    name: new FormControl('',[Validators.required]),
    image: new FormControl(null ,[Validators.required]),
    variant: new FormControl(''),
    category: new FormControl('', Validators.required),
    supplier: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required)
  });
  get getForm() {
    return this.createFrom.controls;
  }
  listCategory: Category[] = [];
  listSupplier: Supplier[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private categoryService: CategoryService,
    private supplierService: SupplierService
  ) {}
  ngOnInit(): void {
    this.categoryService.getAll().subscribe((res: ResponseDto) => {
      this.listCategory = res.data;
    });
    this.supplierService.getAll().subscribe((res: ResponseDto) => {
      this.listSupplier = res.data;
    })
  }
  public inputImage(event: any) {
    this.file = event.target.files[0];
    this.createFrom.get('image')?.setValue(this.file);
  }
  public addProduct() {
    let newParentProduct = {} as ProductParentCreateDto;
    console.log("submit");
    console.log(this.getForm.image);
    if(this.createFrom.valid) {
      newParentProduct.name = this.getForm.name.value || "";
      newParentProduct.price = parseFloat(this.getForm.price.value || '0');
      newParentProduct.quantity = parseFloat(this.getForm.quantity.value || '0');
      newParentProduct.variant = this.getForm.variant.value || '';
      newParentProduct.categoryId = this.getForm.category.value || '';
      newParentProduct.supplierId = this.getForm.supplier.value || '';

      console.log(newParentProduct);
      
    }

  }
}
