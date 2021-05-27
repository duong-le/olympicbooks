import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';

import { CategoryMenuComponent } from '../Components/category/category-menu.component';
import { CategoryComponent } from '../Components/category/category.component';
import { CollectionComponent } from '../Components/collection/collection.component';
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
import { ShopComponent } from '../Components/shop/shop.component';
import { OrderStatePipe } from '../Pipes/orders.pipe';
import { PricePipe } from '../Pipes/prices.pipe';
import { ProductStatusPipe } from '../Pipes/products.pipe';
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
    OrderStatePipe,
    CollectionComponent,
    ShopComponent,
    ProductStatusPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    IconModule,
    NzMenuModule,
    NzDrawerModule,
    NzGridModule,
    NzButtonModule,
    NzInputModule,
    NzCardModule,
    NzResultModule,
    NzImageModule,
    NzDividerModule,
    NzGridModule,
    NzSelectModule,
    NzPaginationModule,
    NzEmptyModule,
    NzSliderModule
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
    OrderStatePipe,
    CollectionComponent,
    ShopComponent,
    ProductStatusPipe
  ]
})
export class SharedModule {}
