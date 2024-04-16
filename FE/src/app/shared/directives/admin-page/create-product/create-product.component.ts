import { SupplierService } from './../../../../core/services/supplier.service';
import { CategoryService } from './../../../../core/services/category.service';
import { Supplier } from './../../../../core/models/Supplier/supplier';
import { AdminService } from './../../../../core/services/admin.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/Category/category';
import { ResponseDto } from 'src/app/core/models/responseDto';
import { ProductParentCreateDto } from 'src/app/core/models/Product/productParentCreateDto';
import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';
import { ImageProduct } from 'src/app/core/models/ImageProduct/imageProduct';
import { ProductParentCreateDto2 } from 'src/app/core/models/Product/productParentCreateDto2';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit{
  // private file: File[] = [];
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
          let newParentProduct = {} as ProductParentCreateDto;
          newParentProduct.name = this.getForm.name.value || "";
          newParentProduct.price = this.getForm.price.value || 0;
          newParentProduct.quantity = this.getForm.quantity.value || 0;
          newParentProduct.variant = this.getForm.variant.value || '';
          newParentProduct.categoryId = this.getForm.category.value || '';
          newParentProduct.supplierId = this.getForm.supplier.value || '';
          const listImageProduct: ImageProduct[] = [];
          let imageProduct = {} as ImageProduct;
          imageProduct.productId = '3d87fc99-bd82-4640-ace6-46e29cb368fa';
          imageProduct.image = this.getForm.image.value || '';
          listImageProduct.push(imageProduct);
          newParentProduct.imageProduct = listImageProduct;
          console.log("Call api");
          
          this.adminService.createParentProduct(newParentProduct).subscribe((res: ResponseDto) => {
            console.log(res);
          })
        });
      }
    );
  }
  public addProductToBE() {
    let newParent = {} as ProductParentCreateDto2;
    if(this.createFrom.valid && this.file) {
      newParent.name = this.getForm.name.value || "";
      newParent.price = this.getForm.price.value || 0;
      newParent.quantity = this.getForm.quantity.value || 0;
      newParent.variant = this.getForm.variant.value || '';
      newParent.categoryId = this.getForm.category.value || '';
      newParent.supplierId = this.getForm.supplier.value || '';
      newParent.imageProduct = [];
      for(var i = 0; i < this.file.length; i++) {
        newParent.imageProduct.push(this.file[i]);
      }
      console.log(newParent);
    }
  }
  public addProduct() {
    // let newParentProduct = {} as ProductParentCreateDto;
    // console.log(this.createFrom);
    // console.log(this.file);
    if(this.createFrom.valid && this.file) {
      this.addData();
      // newParentProduct.name = this.getForm.name.value || "";
      // newParentProduct.price = this.getForm.price.value || 0;
      // newParentProduct.quantity = this.getForm.quantity.value || 0;
      // newParentProduct.variant = this.getForm.variant.value || '';
      // newParentProduct.categoryId = this.getForm.category.value || '';
      // newParentProduct.supplierId = this.getForm.supplier.value || '';
      // const listImageProduct: ImageProduct[] = [];
      // let imageProduct = {} as ImageProduct;
      // imageProduct.productId = '';
      // imageProduct.image = this.getForm.image.value || '';
      // listImageProduct.push(imageProduct);
      // newParentProduct.imageProduct = listImageProduct;
      // console.log(newParentProduct);
    }
  }
}
