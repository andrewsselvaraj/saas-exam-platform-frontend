import { Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { describeHttpError } from '../../core/http-error';
import { OrgTree } from '../../core/organizations/org-tree';
import { OrganizationService } from '../../core/organizations/organization.service';

type LoadState = 'loading' | 'loaded' | 'error';

/** One organisation's classes, subjects and chapters with question counts (GET /api/orgs/{orgId}/tree). */
@Component({
  selector: 'app-org-tree',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './org-tree.component.html',
  styleUrl: './org-tree.component.scss',
})
export class OrgTreeComponent implements OnInit {
  private readonly organizationService = inject(OrganizationService);

  /** Route parameter :orgId. */
  readonly orgId = input.required<string>();

  readonly state = signal<LoadState>('loading');
  readonly tree = signal<OrgTree | null>(null);
  readonly errorMessage = signal('');
  /** Subjects whose chapters are shown. */
  readonly expanded = signal<ReadonlySet<string>>(new Set());

  readonly totalQuestions = computed(() =>
    (this.tree()?.classes ?? []).reduce(
      (sum, c) => sum + c.subjects.reduce((s, subject) => s + subject.questionCount, 0),
      0,
    ),
  );

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.state.set('loading');
    this.organizationService.tree(this.orgId()).subscribe({
      next: (tree) => {
        this.tree.set(tree);
        this.state.set('loaded');
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(describeHttpError(err, 'This organisation does not exist or was deleted.'));
        this.state.set('error');
      },
    });
  }

  toggle(subjectId: string): void {
    this.expanded.update((ids) => {
      const next = new Set(ids);
      if (!next.delete(subjectId)) {
        next.add(subjectId);
      }
      return next;
    });
  }

  plural(count: number, one: string, many = one + 's'): string {
    return `${count} ${count === 1 ? one : many}`;
  }
}
