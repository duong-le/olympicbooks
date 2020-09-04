import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/pages/authentication/authentication.service';
import { Authentication } from '../../shared/Interfaces/authentication.interface';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  user: Authentication;
  headerWidth = 'calc(100% - 300px)';

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.authenticationService.user$.subscribe((user) => (this.user = user));
  }

  collapse(e: EventEmitter<any>) {
    this.headerWidth = `calc(100% - ${e ? '80' : '300'}px)`;
  }

  signOut() {
    this.authenticationService.signOut();
    this.router.navigate(['/']);
  }
}
