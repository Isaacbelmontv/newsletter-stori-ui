import { Routes } from '@angular/router';
import { SubscribeComponent } from './presenter/pages/subscribe/subscribe.component';
import { UnsubscribeComponent } from './presenter/pages/unsubscribe/unsubscribe.component';
import { NotfoundComponent } from './presenter/pages/notfound/notfound.component';
import { SingupComponent } from './presenter/pages/singup/singup.component';

export const routes: Routes = [
  { path: '', redirectTo: '/singup', pathMatch: 'full' },
  { path: 'singup', component: SingupComponent },
  { path: 'subscribe/:id', component: SubscribeComponent },
  { path: 'unsubscribe/:email', component: UnsubscribeComponent },
  { path: '**', component: NotfoundComponent },
];
