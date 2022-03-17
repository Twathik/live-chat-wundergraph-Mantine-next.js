/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import * as Yup from 'yup';
import { AssertsShape, ObjectShape, TypeOfShape } from 'yup/lib/object';
import { AnyObject } from 'yup/lib/types';

const GetValidationSchema = (
  config: any
): Yup.ObjectSchema<any, AnyObject, TypeOfShape<any>, AssertsShape<any>> => {
  const validation: any = {};
  const nastedValidation: any = {};
  config.foreach((e: any) => {
    const EvalName = e.name.split('.', 2);
    if (EvalName.length > 1) {
      if (!nastedValidation[EvalName[0]]) {
        nastedValidation[EvalName[0]] = {};
      }
      nastedValidation[EvalName[0]][EvalName[1]] = e.validation;
    } else {
      validation[EvalName[0]] = e.validation;
    }
  });
  let schema;

  if (Object.entries(nastedValidation).length === 0) {
    schema = Yup.object().shape(validation);
  } else {
    const merge: any = {};
    Object.entries(nastedValidation).forEach(
      ([key, value]) => (merge[key] = Yup.object().shape(value as ObjectShape))
    );

    schema = Yup.object().shape(merge);
  }

  return schema;
};

export default GetValidationSchema;
