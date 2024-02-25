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
import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';
import { ImageProduct } from 'src/app/core/models/ImageProduct/imageProduct';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit{
  private file: any;
  urlImageFirebase: string = '';
  createFrom = this.formBuilder.group({
    name: new FormControl('',[Validators.required]),
    image: new FormControl(''),
    variant: new FormControl(''),
    category: new FormControl('', Validators.required),
    supplier: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.required),
    quantity: new FormControl(0, Validators.required)
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
    private supplierService: SupplierService,
    public storage: Storage
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
    console.log(this.file);
    
  }
  addData() {
    const storageRef = ref(this.storage, 'image/' + this.file.name);
    const uploadTask = uploadBytesResumable(storageRef, this.file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // const progress =
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          this.getForm.image.setValue(downloadURL);
        });
      }
    );
  }
  public addProduct() {
    let newParentProduct = {} as ProductParentCreateDto;
    console.log(this.createFrom);
    console.log(this.file);
    if(this.createFrom.valid && this.file) {
      this.addData();
      newParentProduct.name = this.getForm.name.value || "";
      newParentProduct.price = this.getForm.price.value || 0;
      newParentProduct.quantity = this.getForm.quantity.value || 0;
      newParentProduct.variant = this.getForm.variant.value || '';
      newParentProduct.categoryId = this.getForm.category.value || '';
      newParentProduct.supplierId = this.getForm.supplier.value || '';
      const listImageProduct: ImageProduct[] = [];
      let imageProduct = {} as ImageProduct;
      imageProduct.productId = '';
      imageProduct.image = this.getForm.image.value || '';
      listImageProduct.push(imageProduct);
      newParentProduct.imageProduct = listImageProduct;
      console.log(newParentProduct);
    }
  }
}
