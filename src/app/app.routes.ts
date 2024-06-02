import { Routes } from '@angular/router';
import { SubscribeComponent } from './presenter/pages/subscribe/subscribe.component';
import { UnsubscribeComponent } from './presenter/pages/unsubscribe/unsubscribe.component';
import { NotfoundComponent } from './presenter/pages/notfound/notfound.component';

export const routes: Routes = [
  { path: 'subscribe', component: SubscribeComponent },
  { path: 'unsubscribe/:id', component: UnsubscribeComponent },
  { path: '**', component: NotfoundComponent },
];
