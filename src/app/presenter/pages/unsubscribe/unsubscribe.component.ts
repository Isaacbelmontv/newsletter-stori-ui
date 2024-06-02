import { Component, OnInit } from '@angular/core';
import { SubscriptionsService } from '../../../core/services/subscriptions.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { catchError, of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { INewsletterSubscription } from '../../../common/interfaces/service.interface';

@Component({
  selector: 'app-unsubscribe',
  standalone: true,
  imports: [HttpClientModule, MatListModule],
  providers: [SubscriptionsService],
  templateUrl: './unsubscribe.component.html',
  styleUrl: './unsubscribe.component.scss',
})
export class UnsubscribeComponent implements OnInit {
  subscriptions!: INewsletterSubscription[];
  email!: string;

  constructor(
    private subscriptionsService: SubscriptionsService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.email = String(this.route.snapshot.paramMap.get('email'));

    this.getSubscriptionsByEmail(this.email);
  }

  getSubscriptionsByEmail(email: string) {
    this.subscriptionsService
      .getSubscriptions(email)
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
          this.subscriptions = response;
        }
      });
  }

  subscriptionSelected(subscription: INewsletterSubscription) {
    this.subscriptionsService
      .updateSubscription(subscription.id, !subscription.active)
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
            duration: 4000,
          });
        }
      });
  }
}
