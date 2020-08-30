import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PricePipe } from './Pipes/price.pipe';
import { StatePipe } from './Pipes/state.pipe';

import { NzMenuModule } from 'ng-zorro-antd/menu';

@NgModule({
  declarations: [PricePipe, StatePipe],
  imports: [CommonModule, RouterModule, NzMenuModule],
  exports: [PricePipe, StatePipe]
})
export class SharedModule {}
