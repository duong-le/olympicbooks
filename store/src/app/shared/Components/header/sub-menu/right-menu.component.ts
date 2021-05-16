import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/pages/authentication/authentication.service';
import { CartService } from 'src/app/pages/cart/cart.service';
import { Authentication } from 'src/app/shared/Interfaces/authentication.interface';

@Component({
  selector: 'app-right-menu',
  template: `
    <ul nz-menu [nzMode]="mode" [nzSelectable]="false" (nzClick)="onMenuTitleClick()">
      <ng-container *ngIf="(mode === 'horizontal' && mobile) || (mode === 'horizontal' && !mobile)">
        <li nz-menu-item nzMatchRouter>
          <a routerLink="/cart">
            <i nz-icon nzType="shopping-cart" nzTheme="outline"></i>({{ totalQuantity }})
          </a>
        </li>
      </ng-container>

      <ng-container *ngIf="mode === 'inline' || (mode === 'horizontal' && !mobile)">
        <ng-container *ngIf="user">
          <li nz-submenu [nzTitle]="user.name" nzIcon="user">
            <ul>
              <li nz-menu-item nzMatchRouter>
                <a routerLink="/customer/profile">
                  <i nz-icon nzType="profile" nzTheme="outline"></i>Tài khoản
                </a>
              </li>
              <li nz-menu-item nzMatchRouter>
                <a routerLink="/customer/orders">
                  <i nz-icon nzType="carry-out" nzTheme="outline"></i>Đơn hàng
                </a>
              </li>
              <li nz-menu-item (click)="signOut()">
                <i nz-icon nzType="logout" nzTheme="outline"></i>Đăng xuất
              </li>
            </ul>
          </li>
        </ng-container>

        <ng-container *ngIf="!user">
          <li nz-submenu nzTitle="Tài khoản" nzIcon="user">
            <ul>
              <li nz-menu-item nzMatchRouter>
                <a routerLink="/signin"><i nz-icon nzType="login" nzTheme="outline"></i>Đăng nhập</a>
              </li>
              <li nz-menu-item nzMatchRouter>
                <a routerLink="/signup"><i nz-icon nzType="user-add" nzTheme="outline"></i>Đăng ký</a>
              </li>
            </ul>
          </li>
        </ng-container>
      </ng-container>
    </ul>
  `,
  styleUrls: ['./sub-menu.component.scss']
})
export class RightMenuComponent implements OnInit {
  @Input() mode: string;
  @Input() mobile: boolean;
  @Output() onNavigate: EventEmitter<any> = new EventEmitter();
  user: Authentication;
  totalQuantity: number;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.authenticationService.user$.subscribe((user) => (this.user = user));
    this.cartService.cart$.subscribe((response) => (this.totalQuantity = response.totalQuantity));
  }

  onMenuTitleClick() {
    this.onNavigate.emit();
  }

  signOut() {
    this.authenticationService.signOut();
    this.router.navigate(['/']);
  }
}
