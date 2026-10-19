import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Organization } from './organization';

/**
 * Calls the API gateway on the same origin: `ng serve` proxies /api (proxy.conf.json)
 * and on OpenShift nginx forwards /api to the api-gateway Service.
 */
@Injectable({ providedIn: 'root' })
export class OrganizationService {
  private readonly http = inject(HttpClient);

  list(): Observable<Organization[]> {
    return this.http.get<Organization[]>('/api/orgs');
  }
}
