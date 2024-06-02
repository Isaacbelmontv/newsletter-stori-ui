import { Routes } from '@angular/router';
import { SubscribeComponent } from './presenter/pages/subscribe/subscribe.component';
import { UnsubscribeComponent } from './presenter/pages/unsubscribe/unsubscribe.component';
import { NotfoundComponent } from './presenter/pages/notfound/notfound.component';

export const routes: Routes = [
  { path: 'subscribe/:id', component: SubscribeComponent },
  { path: 'unsubscribe/:email', component: UnsubscribeComponent },
  { path: '**', component: NotfoundComponent },
];
