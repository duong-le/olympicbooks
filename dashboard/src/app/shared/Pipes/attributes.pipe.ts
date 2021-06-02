import { Pipe, PipeTransform } from '@angular/core';

import { AttributeInputMode } from '../Enums/attributes.enum';

@Pipe({
  name: 'attributeinputmode'
})
export class AttributeInputModePipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case AttributeInputMode.DEFAULT:
        return 'Lựa chọn một giá trị';
      case AttributeInputMode.MULTIPLE:
        return 'Lựa chọn nhiều giá trị';
      default:
        return null;
    }
  }
}
