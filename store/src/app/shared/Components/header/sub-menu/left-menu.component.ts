import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/pages/categories/categories.service';
import { Category } from 'src/app/shared/Interfaces/category.interface';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./sub-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {
  @Input() mode: string;
  @Input() mobile: boolean;
  @Output() onNavigate: EventEmitter<any> = new EventEmitter();
  categories: Category[];
  constructor(private CategoriesService: CategoriesService) {}

  ngOnInit() {
    this.CategoriesService.categories$.subscribe(
      (response) => (this.categories = response),
      (error) => {}
    );
  }

  onMenuTitleClick() {
    this.onNavigate.emit();
  }
}
