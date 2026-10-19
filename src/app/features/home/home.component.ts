import { Component, signal } from '@angular/core';
import { Location } from '@angular/common';

interface QuickLink {
  label: string;
  icon: string;
}

interface NavTab {
  id: 'home' | 'bible' | 'exams';
  label: string;
  icon: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly verseOfTheDay = {
    text: 'I Can Do All Things Through Christ Who Strengthens Me.',
    reference: 'Philippians 4:13',
  };

  readonly upcomingEvent = {
    title: 'Sunday Bible Challenge',
    schedule: 'This Sunday · 7:00 PM · 50 Questions',
  };

  readonly quickLinks: QuickLink[] = [
    { label: 'Leaderboard', icon: 'fa-trophy' },
    { label: 'Rewards', icon: 'fa-gift' },
  ];

  readonly tabs: NavTab[] = [
    { id: 'home', label: 'Home', icon: 'fa-house' },
    { id: 'bible', label: 'Bible', icon: 'fa-book-bible' },
    { id: 'exams', label: 'Exams', icon: 'fa-graduation-cap' },
  ];

  readonly activeTab = signal<NavTab['id']>('bible');

  constructor(private readonly location: Location) {}

  goBack(): void {
    this.location.back();
  }

  // Quiz, event, leaderboard and rewards screens are not built yet.
  startTodaysQuiz(): void {}

  exploreQuizzes(): void {}

  viewEvent(): void {}

  openQuickLink(_link: QuickLink): void {}

  selectTab(id: NavTab['id']): void {
    this.activeTab.set(id);
  }
}
