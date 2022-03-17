import { ReactElement } from 'react';

export interface MenuSubSection<T> {
  section: {
    type: T;
    label: string;
  }[];
  label: string;
  type: 'section' | 'component';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: ReactElement<any, any> | null;
}
interface Menu<T> {
  [x: string]: MenuSubSection<T>[];
}

export default Menu;
