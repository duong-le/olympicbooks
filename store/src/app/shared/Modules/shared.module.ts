import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzResultModule } from 'ng-zorro-antd/result';

import { CategoryMenuComponent } from '../Components/category/category-menu.component';
import { CategoryComponent } from '../Components/category/category.component';
import { FooterComponent } from '../Components/footer/footer.component';
import { HeaderComponent } from '../Components/header/header.component';
import { LeftMenuComponent } from '../Components/header/sub-menu/left-menu.component';
import { RightMenuComponent } from '../Components/header/sub-menu/right-menu.component';
import { ProductComponent } from '../Components/product/product.component';
import { CartEmptyComponent } from '../Components/result/empty/cart-empty.component';
import { NotExistComponent } from '../Components/result/error/not-exist.component';
import { OrderErrorComponent } from '../Components/result/error/order-error.component';
import { OrderSuccessComponent } from '../Components/result/success/order-success.component';
import { SearchComponent } from '../Components/search/search.component';
import { OrderStatePipe } from '../Pipes/order-state.pipe';
import { PricePipe } from '../Pipes/price.pipe';
import { IconModule } from './icon.module';

@NgModule({
  declarations: [
    HeaderComponent,
    RightMenuComponent,
    LeftMenuComponent,
    FooterComponent,
    SearchComponent,
    ProductComponent,
    CategoryComponent,
    CategoryMenuComponent,
    NotExistComponent,
    OrderSuccessComponent,
    OrderErrorComponent,
    CartEmptyComponent,
    PricePipe,
    OrderStatePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    IconModule,
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
    CategoryMenuComponent,
    NotExistComponent,
    OrderSuccessComponent,
    OrderErrorComponent,
    CartEmptyComponent,
    PricePipe,
    OrderStatePipe
  ]
})
export class SharedModule {}
