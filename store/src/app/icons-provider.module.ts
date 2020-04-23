import { NgModule } from '@angular/core';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

import {
  MenuOutline,
  ShoppingCartOutline,
  SearchOutline,
} from '@ant-design/icons-angular/icons';

const icons = [MenuOutline, ShoppingCartOutline, SearchOutline];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [{ provide: NZ_ICONS, useValue: icons }],
})
export class IconsProviderModule {}
