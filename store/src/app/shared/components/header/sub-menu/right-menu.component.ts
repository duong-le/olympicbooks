import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/pages/authentication/authentication.service';
import { Authentication } from 'src/app/shared/Interfaces/authentication.interface';
import { CartService } from 'src/app/pages/cart/cart.service';

@Component({
  selector: 'app-right-menu',
  templateUrl: './right-menu.component.html',
  styleUrls: ['./sub-menu.component.scss']
})
export class RightMenuComponent implements OnInit {
  @Input() mode: string;
  @Input() mobile: boolean;
  @Output() onNavigate: EventEmitter<any> = new EventEmitter();
  user: Authentication;
  totalQty: number;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.authenticationService.user$.subscribe((user) => (this.user = user));
    this.cartService.cart$.subscribe((response) => (this.totalQty = response.totalQty));
  }

  onMenuTitleClick() {
    this.onNavigate.emit();
  }

  signOut() {
    this.authenticationService.signOut();
    this.router.navigate(['/']);
  }
}
