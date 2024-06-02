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
import { MatInputModule } from '@angular/material/input';
import { SubscriptionsService } from '../../../core/services/subscriptions.service';
import { HttpClientModule } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-subscribe',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
  ],
  providers: [SubscriptionsService],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.scss',
})
export class SubscribeComponent implements OnInit {
  newsletterForm: FormGroup = new FormGroup({
    email: new FormControl(''),
  });

  submitted = false;

  get f(): { [key: string]: AbstractControl } {
    return this.newsletterForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private subscriptionsService: SubscriptionsService
  ) {}

  ngOnInit(): void {
    this.newsletterForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.newsletterForm.invalid) {
      return;
    }

    this.subscriptionsService
      .createSubscription(this.newsletterForm.value.email, 1)
      .pipe(
        catchError((error) => {
          console.error('Error al hacer la solicitud:', error);
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          this.newsletterForm.reset();
        }
      });
  }
}
