import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
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
