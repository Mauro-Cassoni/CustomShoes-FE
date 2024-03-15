import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { tap, catchError, Observable } from 'rxjs';
import { IProductMsg } from '../../../Models/i-product-msg';
import { ApiShopService } from '../../../Services/api-shop.service';
import { IProduct } from '../../../Models/i-product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent {

  form! : FormGroup;
  loading! : boolean;
  somethingWrong! : boolean;
  errorMsg!:IProductMsg;
  msg!:IProductMsg;
  match: boolean = false
  categories: string[] = [];
  product!: IProduct;
  showManualCategory: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiShopService: ApiShopService,
    private router: Router
  ) { }

  ngOnInit() {
    this.apiShopService.product$.subscribe(res => {
      if (res) this.product = res;
    });

    this.apiShopService.getAllCat().subscribe(res => {
      this.categories = res
    })

    this.form = this.formBuilder.group({

      img: this.formBuilder.control(this.product.img, [Validators.required]),
      name: this.formBuilder.control(this.product.name, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      brand: this.formBuilder.control(this.product.brand, [Validators.minLength(2), Validators.maxLength(20)]),
      category: this.formBuilder.control(this.product.category, [Validators.required]),
      manualCategory:  this.formBuilder.control(''),
      description: this.formBuilder.control(this.product.description, [Validators.minLength(2)]),
      size: this.formBuilder.control(this.product.size, [Validators.minLength(2)]),
      color: this.formBuilder.control(this.product.color, [Validators.minLength(2)]),
      price: this.formBuilder.control(this.product.price, [Validators.required, Validators.pattern(/^\d+(\.\d{2})?$/)]),
      onSale: this.formBuilder.control(this.product.OnSale, [Validators.required])

    })
  }

  submit(){
    this.loading=true;

    this.form.value.size = Number(this.form.value.size);
    this.form.value.price = Number(this.form.value.price);

    this.apiShopService.create(this.form.value)
    .pipe(tap(()=>{
      this.loading=false
      this.router.navigate(['/account/products'])
    }),catchError(error=>{
      this.somethingWrong=true;
      console.log(error);

      throw error;
    })).subscribe();
  }

  invalidMessages(fieldName: string): string {
    const field: AbstractControl | null = this.form.get(fieldName)
    let errorMsg: string = ''
    if (field) {
      if (field.errors) {
        if (field.errors['required']) errorMsg = 'Empty field'
        if (field.errors['pattern'] && fieldName === 'price') errorMsg = 'Incorrect format (es. 10.99)'
        if (field.errors['minlength']) errorMsg = 'Minimum length: 2 characters'
      }
    }
    return errorMsg
  }

  ngDoCheck(){
    this.errorMsg = {
      img: this.invalidMessages('img'),
      name: this.invalidMessages('name'),
      brand: this.invalidMessages('brand'),
      category: this.invalidMessages('category'),
      manualCategory: this.invalidMessages('manualCategory'),
      description: this.invalidMessages('description'),
      size: this.invalidMessages('size'),
      color: this.invalidMessages('color'),
      price: this.invalidMessages('price'),
    }

    this.msg = {
      img: '',
      name: '',
      brand: '',
      category: '',
      manualCategory: '',
      description:'',
      size: '',
      color: '',
      price: '',
    }

    if (this.errorMsg.img) {
      this.msg.img = this.errorMsg.img
    }

    if (this.errorMsg.name) {
      this.msg.name = this.errorMsg.name
    }

    if (this.errorMsg.brand) {
      this.msg.brand = this.errorMsg.brand
    }

    if (this.errorMsg.category) {
      this.msg.category = this.errorMsg.category
    }

    if (this.errorMsg.manualCategory) {
      this.msg.manualCategory = this.errorMsg.manualCategory
    }

    if (this.errorMsg.description) {
      this.msg.description = this.errorMsg.description
    }

    if (this.errorMsg.size) {
      this.msg.size = this.errorMsg.size
    }

    if (this.errorMsg.color) {
      this.msg.color = this.errorMsg.color
    }

    if (this.errorMsg.price) {
      this.msg.price = this.errorMsg.price
    }

  }

  isValid(inputName:string){
    return this.form.get(inputName)?.valid && this.form.get(inputName)?.dirty
  }

  isInvalid(inputName:string){
    return !this.form.get(inputName)?.valid && this.form.get(inputName)?.dirty
  }

}
