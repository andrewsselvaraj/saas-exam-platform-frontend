import { Component, OnInit, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Organization } from '../../core/organizations/organization';
import { OrganizationService } from '../../core/organizations/organization.service';

type LoadState = 'loading' | 'loaded' | 'error';

@Component({
  selector: 'app-organizations',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './organizations.component.html',
  styleUrl: './organizations.component.scss',
})
export class OrganizationsComponent implements OnInit {
  private readonly organizationService = inject(OrganizationService);

  readonly state = signal<LoadState>('loading');
  readonly organizations = signal<Organization[]>([]);
  readonly errorMessage = signal('');

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.state.set('loading');
    this.organizationService.list().subscribe({
      next: (orgs) => {
        this.organizations.set(orgs);
        this.state.set('loaded');
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(
          err.status === 0 || err.status >= 500
            ? 'The exam service is not reachable right now.'
            : `The server answered ${err.status}.`,
        );
        this.state.set('error');
      },
    });
  }

  isActive(org: Organization): boolean {
    return org.status === 'A';
  }
}
