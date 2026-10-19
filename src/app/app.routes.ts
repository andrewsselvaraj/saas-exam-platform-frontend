import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { OrganizationsComponent } from './features/organizations/organizations.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Bible Quiz' },
  { path: 'organizations', component: OrganizationsComponent, title: 'Organisations · Bible Quiz' },
  { path: '**', redirectTo: '' },
];
