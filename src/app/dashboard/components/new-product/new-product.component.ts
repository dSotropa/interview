import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ParseValidationErrorsPipe} from "../../../shared/pipes/parse-validation-errors.pipe";
import {NgbInputDatepicker} from "@ng-bootstrap/ng-bootstrap";
import {SalesDataService} from "../../../shared/services/sales-data.service";

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ParseValidationErrorsPipe, NgbInputDatepicker],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss'
})
export class NewProductComponent implements OnInit {
  form!: FormGroup;
  addSuccess = false;
  constructor(private fb: FormBuilder, private salesDataService: SalesDataService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      productName: ['', [Validators.required, Validators.maxLength(50)]],
      productID: ['', [Validators.required, Validators.maxLength(13)]],
      productManager: ['', [Validators.maxLength(30)]],
      salesStartDate: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }

  addNewProduct() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
      return;
    }
    const {productName, productID} = this.form.value;
    this.salesDataService.addNewProduct({productName, productID});
    this.form.reset();
    this.form.updateValueAndValidity();
    this.addSuccess = true;

    setTimeout(() => {
      this.addSuccess = false;
    }, 3000)

  }

  resetForm() {
    this.form.reset();
    this.form.updateValueAndValidity();
  }
}
