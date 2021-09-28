import { NgModule } from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';
import { DeleteOutline, EditOutline } from '@ant-design/icons-angular/icons';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

const icons: IconDefinition[] = [EditOutline, DeleteOutline];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [{ provide: NZ_ICONS, useValue: icons }]
})
export class IconsModule {}
