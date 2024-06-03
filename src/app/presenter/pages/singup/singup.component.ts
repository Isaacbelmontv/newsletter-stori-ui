import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [
    MatTabsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatSnackBarModule,
    HttpClientModule,
  ],
  providers: [AuthService],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.scss',
})
export class SingupComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  loginForm: FormGroup = new FormGroup({
    emailLogin: new FormControl(''),
    passwordLogin: new FormControl(''),
  });

  submitted = false;
  hide = true;

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  get fLogin(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });

    this.loginForm = this.formBuilder.group({
      emailLogin: ['', [Validators.required, Validators.email]],
      passwordLogin: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  onSubmitRegister(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.authService
      .createUser(
        this.registerForm.value.email,
        this.registerForm.value.password,
        'admin'
      )
      .pipe(
        catchError((error) => {
          this.snackBar.open(error.error.message, 'Cerrar', {
            duration: 3000,
          });
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          this.snackBar.open(response.message, 'Cerrar', {
            duration: 3000,
          });
          this.registerForm.reset();
          this.redirectToNewsletters();
        }
      });

    this.snackBar.open('success', 'Cerrar', {
      duration: 3000,
    });
  }

  onSubmitLogin(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.authService
      .login(
        this.loginForm.value.emailLogin,
        this.loginForm.value.passwordLogin
      )
      .pipe(
        catchError((error) => {
          this.snackBar.open(error.error.message, 'Cerrar', {
            duration: 3000,
          });
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          this.snackBar.open(response.message, 'Cerrar', {
            duration: 3000,
          });
          this.loginForm.reset();
          this.redirectToNewsletters();
        }
      });
  }

  redirectToNewsletters(): void {
    this.router.navigate(['/newsletters']);
  }
}
