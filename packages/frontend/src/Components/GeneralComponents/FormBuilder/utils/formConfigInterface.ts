/* eslint-disable @typescript-eslint/no-explicit-any */
import { SelectItem } from '@mantine/core';
import { inputType } from '../inputs/InputType';

export interface FormConfigType {
  name: string;
  control: inputType;
  label?: string;
  type?: string;
  size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined;
  autoComplete?: string;
  options?: (string | SelectItem)[];
  className?: string;
  initialValue: any;
  order: number;
}
