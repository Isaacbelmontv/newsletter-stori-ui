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
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { catchError, of } from 'rxjs';
import { SubscriptionsService } from '../../../core/services/subscriptions.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

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
    MatSnackBarModule,
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

  newsLetterId!: number;

  get f(): { [key: string]: AbstractControl } {
    return this.newsletterForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private subscriptionsService: SubscriptionsService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.newsletterForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.newsLetterId = Number(this.route.snapshot.paramMap.get('id'));
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.newsletterForm.invalid) {
      return;
    }

    this.subscriptionsService
      .createSubscription(this.newsletterForm.value.email, this.newsLetterId)
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
          this.newsletterForm.reset();
        }
      });
  }
}
