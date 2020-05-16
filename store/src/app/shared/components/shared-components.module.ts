import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { RightMenuComponent } from './header/sub-menu/right-menu.component';
import { LeftMenuComponent } from './header/sub-menu/left-menu.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { NotExistComponent } from './error/not-exist.component';

import { IconsProviderModule } from '../../icons-provider.module';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzResultModule } from 'ng-zorro-antd/result';

@NgModule({
  declarations: [
    HeaderComponent,
    RightMenuComponent,
    LeftMenuComponent,
    FooterComponent,
    SearchComponent,
    ProductComponent,
    CategoryComponent,
    NotExistComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IconsProviderModule,
    NzMenuModule,
    NzDrawerModule,
    NzGridModule,
    NzButtonModule,
    NzInputModule,
    NzCardModule,
    NzResultModule
  ],
  exports: [
    HeaderComponent,
    RightMenuComponent,
    LeftMenuComponent,
    FooterComponent,
    SearchComponent,
    ProductComponent,
    CategoryComponent,
    NotExistComponent
  ]
})
export class SharedComponentsModule {}
