import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.css',
})
export class MatchesComponent implements OnInit {
  matches: Observable<Schema["Match"]["type"][]> | null = null;

  private matchesClient = generateClient<Schema>();

  ngOnInit(): void {
    this.observeMatches();
  }

  observeMatches() {
    try {
      this.matches = this.matchesClient.models.Match.observeQuery()
        .pipe(
          map(
            ({ items }) => items),
          catchError((error, caught) => { console.error('error fetching matches', error); return caught })
        );
    } catch (error) {
      console.error('error creating observer for matches', error);
    }
  }

  async createMatch() {
    try {
      await this.matchesClient.models.Match.create({
        teamHome: 'Team 1',
        teamAway: 'Team 2',
        startTime: new Date().toISOString(),
      });
    } catch (error) {
      console.error('error creating match', error);
    }
  }

  async deleteMatch(id: string) {
    try {
      await this.matchesClient.models.Match.delete({ id });
    } catch (error) {
      console.error('error deleting match', error);
    }
  }
}
