/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */

import _ from 'lodash';
import { FormConfigType } from './formConfigInterface';

export const removeEmpty = (obj: any, model: string, configFile: FormConfigType[]): any => {
  const row = _.cloneDeep(obj);
  _.mapKeys(row, (value, key) => {
    const input = configFile.find((field) => field.name === `${model}.${key}`);
    if (input!.type === 'number' && value === '') {
      row[key] = null;
    }
  });
  return row;
};
export const cleanValues = (obj: any, model: string, configFile: FormConfigType[]) => {
  const row = _.cloneDeep(obj);
  _.mapKeys(row, (value, key) => {
    const input = configFile.find((field) => field.name === `${model}.${key}`);

    if (value === null && input!.type === 'number') {
      row[key] = '';
    }
  });
  return row;
};
