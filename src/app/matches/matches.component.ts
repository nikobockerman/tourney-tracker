import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';

const client = generateClient<Schema>();

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.css',
})
export class MatchesComponent implements OnInit {
  matches: any[] = [];

  ngOnInit(): void {
    this.listMatches();
  }

  listMatches() {
    try {
      client.models.Match.observeQuery().subscribe({
        next: ({ items, isSynced }) => {
          this.matches = items;
        },
      });
    } catch (error) {
      console.error('error fetching matches', error);
    }
  }

  createMatch() {
    try {
      client.models.Match.create({
        teamHome: 'Team 1',
        teamAway: 'Team 2',
        startTime: new Date().toISOString(),
      });
      this.listMatches();
    } catch (error) {
      console.error('error creating match', error);
    }
  }

  deleteMatch(id: string) {
    client.models.Match.delete({ id });
  }
}
