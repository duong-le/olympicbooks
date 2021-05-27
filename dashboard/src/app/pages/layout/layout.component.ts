import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../pages/authentication/authentication.service';
import { Authentication } from '../../shared/Interfaces/authentication.interface';
import { ThemeService } from '../../shared/Providers/theme.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
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
