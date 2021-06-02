import { AttributeInputMode } from '../Enums/attributes.enum';

export interface Attribute {
  id: number;
  name: string;
  isRequired: boolean;
  inputMode: AttributeInputMode;
  attributeValues: AttributeValue[];
}

export interface AttributeValue {
  id?: number;
  value: string;
}
