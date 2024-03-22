import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs';
import { IRegisterData } from '../../../Models/auth/i-register-data';
import { AuthService } from '../../../Services/auth.service';
import { IAddress } from '../../../Models/i-address';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrl: './edit-address.component.scss'
})
export class EditAddressComponent {

  form!: FormGroup;
  loading!: boolean;
  somethingWrong!: boolean;
  errorMsg!: IAddress;
  msg!: IAddress;
  match: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({

      name: this.formBuilder.control(null, [Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern(/^[a-zA-Z\s']*$/)]),
      surname: this.formBuilder.control(null, [Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern(/^[a-zA-Z\s']*$/)]),
      street: this.formBuilder.control(null, [Validators.required]),
      streetNumber: this.formBuilder.control(null, [Validators.required]),
      city: this.formBuilder.control(null, [Validators.required]),
      postalCode: this.formBuilder.control(null, [Validators.required]),
      country: this.formBuilder.control(null, [Validators.required]),
      province: this.formBuilder.control(null, [Validators.required]),
      municipality: this.formBuilder.control(null, [Validators.required]),
      phoneNumber: this.formBuilder.control(null, [Validators.required]),
    })
  }

  submit() {
    this.loading = true;
    this.form.value.name = this.form.value.name.charAt(0).toUpperCase() + this.form.value.name.slice(1).toLowerCase();
    this.form.value.surname = this.form.value.surname.charAt(0).toUpperCase() + this.form.value.surname.slice(1).toLowerCase();

    this.authService.register(this.form.value)
      .pipe(tap(() => {
        this.loading = false
      }), catchError(error => {
        this.somethingWrong = true;
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
        if (field.errors['minlength'] && (fieldName === 'name' || fieldName === 'surname')) errorMsg = 'Minimum length: 2 characters'
        if (field.errors['maxlength'] && (fieldName === 'name' || fieldName === 'surname')) errorMsg = 'Maximum length: 15 characters'
        if (field.errors['pattern'] && (fieldName === 'name' || fieldName === 'surname')) errorMsg = 'Only letters of the alphabet are allowed'
      }
    }
    return errorMsg
  }

  ngDoCheck() {

    this.form.updateValueAndValidity();

    this.errorMsg = {

      name: this.invalidMessages('name'),
      surname: this.invalidMessages('surname'),
      street: this.invalidMessages('street'),
      streetNumber: this.invalidMessages('streetNumber'),
      city: this.invalidMessages('city'),
      postalCode: this.invalidMessages('postalCode'),
      country: this.invalidMessages('country'),
      province: this.invalidMessages('province'),
      municipality: this.invalidMessages('municipality'),
      phoneNumber: this.invalidMessages('phoneNumber'),
    }

    this.msg = {
      name: '',
      surname: '',
      street: '',
      streetNumber: '',
      city: '',
      postalCode: '',
      country: '',
      province: '',
      municipality: '',
      phoneNumber: '',
    }

    if (this.errorMsg.name) {
      this.msg.name = this.errorMsg.name
    }

    if (this.errorMsg.surname) {
      this.msg.surname = this.errorMsg.surname
    }

    if (this.errorMsg.street) {
      this.msg.street = this.errorMsg.street
    }

    if (this.errorMsg.streetNumber) {
      this.msg.streetNumber = this.errorMsg.streetNumber
    }

    if (this.errorMsg.city) {
      this.msg.city = this.errorMsg.city
    }

    if (this.errorMsg.postalCode) {
      this.msg.postalCode = this.errorMsg.postalCode
    }

    if (this.errorMsg.country) {
      this.msg.country = this.errorMsg.country
    }

    if (this.errorMsg.province) {
      this.msg.province = this.errorMsg.province
    }

    if (this.errorMsg.municipality) {
      this.msg.municipality = this.errorMsg.municipality
    }

    if (this.errorMsg.phoneNumber) {
      this.msg.phoneNumber = this.errorMsg.phoneNumber
    }

  }

  isValid(inputName: string) {
    return this.form.get(inputName)?.valid && this.form.get(inputName)?.dirty
  }

  isInvalid(inputName: string) {
    return !this.form.get(inputName)?.valid && this.form.get(inputName)?.dirty
  }

}
