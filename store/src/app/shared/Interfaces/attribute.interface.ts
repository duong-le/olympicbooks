import { AttributeInputMode } from '../Enums/attributes.enum';

export interface Attribute {
  id: number;
  name: string;
  mandatory: boolean;
  inputMode: AttributeInputMode;
  attributeValues: AttributeValue[];
}

export interface AttributeValue {
  id?: number;
  name: string;
}
