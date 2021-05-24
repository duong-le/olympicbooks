import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  template: `
    <nz-input-group [nzPrefix]="searchIcon" [nzSuffix]="clearIcon">
      <input
        type="text"
        nz-input
        [placeholder]="placeHolder"
        [(ngModel)]="query"
        (keyup.enter)="emitSearchValue()"
      />
    </nz-input-group>

    <ng-template #searchIcon>
      <i nz-icon nzType="search"></i>
    </ng-template>

    <ng-template #clearIcon>
      <i
        nz-icon
        nzTheme="fill"
        nzType="close-circle"
        class="ant-input-clear-icon"
        *ngIf="query"
        (click)="clearInput()"
      ></i>
    </ng-template>
  `,
  styles: [
    `
      .ant-input {
        border-radius: 0;
      }
    `
  ]
})
export class SearchComponent implements OnInit {
  @Input() placeHolder: string;
  @Output() onSearch: EventEmitter<any> = new EventEmitter();

  subscription$$: Subscription;
  query: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.subscription$$ = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.query = this.activatedRoute.snapshot.queryParams['keyword'];
        this.subscription$$.unsubscribe();
      }
    });
  }

  emitSearchValue() {
    this.onSearch.emit(this.query);
  }

  clearInput() {
    this.query = null;
    if (this.router.url.startsWith('/shops')) this.emitSearchValue();
  }
}
