import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Authentication } from '../../shared/Interfaces/authentication.interface';
import { ThemeService } from '../../shared/Providers/theme.service';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: Authentication;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.authenticationService.user$.subscribe((user) => (this.user = user));
  }

  toggleTheme(): void {
    this.themeService.toggleTheme().then();
  }

  signOut(): void {
    this.authenticationService.signOut();
    this.router.navigate(['/']);
  }
}
