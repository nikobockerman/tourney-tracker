import {
  AmplifyAuthenticatorModule,
  AuthenticatorService,
} from '@aws-amplify/ui-angular';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Amplify } from 'aws-amplify';

import { MatchesComponent } from './matches/matches.component';

import outputs from '../../amplify_outputs.json';

Amplify.configure(outputs);

@Component({
  // Amplify-authenticator requires the default change detection strategy
  // Feature request for this: https://github.com/aws-amplify/amplify-ui/issues/4899
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [MatchesComponent, AmplifyAuthenticatorModule],
  selector: 'app-root',
  styleUrl: './app.component.css',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'tourney-tracker';

  constructor(public auth: AuthenticatorService) {
    Amplify.configure(outputs);
  }
}
