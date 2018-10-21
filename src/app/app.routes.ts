import { Routes } from '@angular/router';
import {
  HomePageComponent, LoginPageComponent, NoContentPageComponent
} from './pages';
import { AuthGuard } from 'src/shared/services';
export const ROUTES: Routes = [
  { path: '', component: HomePageComponent, data: { title: 'arp0d3v' }},
  { path: 'home', component: HomePageComponent, data: { title: 'Home' }},
  { path: 'login', component: LoginPageComponent, data: { title: 'Login' } },
  // { path: 'profile', component: ProfilePage, data: { title: 'Profile' }, canActivate: [AuthGuard] },
  { path: '**', component: NoContentPageComponent },
];
