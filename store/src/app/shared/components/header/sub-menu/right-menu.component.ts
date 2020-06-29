import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/pages/authentication/authentication.service';

@Component({
  selector: 'app-right-menu',
  templateUrl: './right-menu.component.html',
  styleUrls: ['./sub-menu.component.scss']
})
export class RightMenuComponent {
  @Input() mode: string;
  @Input() quantity: number;
  @Input() mobile: boolean;
  @Output() onNavigate: EventEmitter<any> = new EventEmitter();
  currentUser;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      (_) => (this.currentUser = _)
    );
  }

  onMenuTitleClick() {
    this.onNavigate.emit();
  }

  signOut() {
    this.authenticationService.signOut();
    this.router.navigate(['/']);
  }
}
