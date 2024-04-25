import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {CommonModule} from '@angular/common';
import {ParseValidationErrorsPipe} from "../../../shared/pipes/parse-validation-errors.pipe";
import {tap} from "rxjs";
import {User} from "../../../shared/models/user";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ParseValidationErrorsPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginFailed: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      this.loginForm.updateValueAndValidity();
      return;
    }

    this.loginFailed = false;
    const {email, password} = this.loginForm.value;
    this.authService.login(email, password)
      .pipe(
        tap((value: User | boolean) => {
          if (!value) {
            this.loginFailed = true;
          }
        })
      )
      .subscribe();
  }
}
