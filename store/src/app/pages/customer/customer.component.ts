import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, OnDestroy {
  subscription$$: Subscription;
  isVisible = true;

  constructor(private router: Router) {
    this.subscription$$ = router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => (this.isVisible = event['url'] === '/customer' ? false : true));
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription$$.unsubscribe();
  }
}
