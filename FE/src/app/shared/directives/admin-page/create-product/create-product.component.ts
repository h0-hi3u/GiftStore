import { SupplierService } from './../../../../core/services/supplier.service';
import { CategoryService } from './../../../../core/services/category.service';
import { Supplier } from './../../../../core/models/Supplier/supplier';
import { AdminService } from './../../../../core/services/admin.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/Category/category';
import { ResponseDto } from 'src/app/core/models/responseDto';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit{
  createFrom: any;
  listCategory: Category[] = [];
  listSupplier: Supplier[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private categoryService: CategoryService,
    private supplierService: SupplierService
  ) {}
  ngOnInit(): void {
      this.createFrom = this.formBuilder.group({
          name: new FormControl('',[Validators.required]),
          image: new FormControl(''),
          variant: new FormControl(''),
          category: new FormControl('', Validators.required),
          supplier: new FormControl('', Validators.required),
          description: new FormControl('', Validators.required),
          price: new FormControl('', Validators.required),
          quantity: new FormControl('', Validators.required)
      });
    this.categoryService.getAll().subscribe((res: ResponseDto) => {
      this.listCategory = res.data;
    });
    this.supplierService.getAll().subscribe((res: ResponseDto) => {
      this.listSupplier = res.data;
    })
  }
}
