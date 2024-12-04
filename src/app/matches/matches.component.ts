import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { generateClient } from 'aws-amplify/data';

import type { Schema } from '../../../amplify/data/resource';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  selector: 'app-matches',
  styleUrl: './matches.component.css',
  templateUrl: './matches.component.html',
})
export class MatchesComponent implements OnInit {
  matches: Observable<Schema['Match']['type'][]> | null = null;

  private matchesClient = generateClient<Schema>();

  ngOnInit(): void {
    this.observeMatches();
  }

  observeMatches() {
    try {
      this.matches = this.matchesClient.models.Match.observeQuery().pipe(
        map(({ items }) => items),
        catchError((error, caught) => {
          console.error('error fetching matches', error);
          return caught;
        }),
      );
    } catch (error) {
      console.error('error creating observer for matches', error);
    }
  }

  async createMatch() {
    try {
      await this.matchesClient.models.Match.create({
        startTime: new Date().toISOString(),
        teamAway: 'Team 2',
        teamHome: 'Team 1',
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
