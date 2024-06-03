import { Routes } from '@angular/router';
import { SubscribeComponent } from './presenter/pages/subscribe/subscribe.component';
import { UnsubscribeComponent } from './presenter/pages/unsubscribe/unsubscribe.component';
import { NotfoundComponent } from './presenter/pages/notfound/notfound.component';
import { SingupComponent } from './presenter/pages/singup/singup.component';
import { NewslettersComponent } from './presenter/pages/newsletters/newsletters.component';
import { SubscriptionsComponent } from './presenter/pages/subscriptions/subscriptions.component';

export const routes: Routes = [
  { path: '', redirectTo: '/singup', pathMatch: 'full' },
  { path: 'singup', component: SingupComponent },
  { path: 'subscribe/:id', component: SubscribeComponent },
  { path: 'unsubscribe/:email', component: UnsubscribeComponent },
  { path: 'newsletters', component: NewslettersComponent },
  { path: 'subscriptions', component: SubscriptionsComponent },
  { path: '**', component: NotfoundComponent },
];
