import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { OrganizationsComponent } from './features/organizations/organizations.component';
import { OrgTreeComponent } from './features/org-tree/org-tree.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Bible Quiz' },
  { path: 'organizations', component: OrganizationsComponent, title: 'Organisations · Bible Quiz' },
  { path: 'organizations/:orgId', component: OrgTreeComponent, title: 'Classes · Bible Quiz' },
  { path: '**', redirectTo: '' },
];
