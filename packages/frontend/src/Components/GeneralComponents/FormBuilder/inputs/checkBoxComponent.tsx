/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-props-no-spreading */
import { FC } from 'react';
import { Field } from 'formik';
import { Checkbox, CheckboxProps } from '@mantine/core';
import EvalNameFunction, { EvalNamePayload } from '../utils/EvalName';

const CheckBoxComponent: FC<CheckboxProps> = (props) => {
  const { label, name, ...otherProps } = props;
  return (
    <div>
      <Field name={name}>
        {({ form, field }: { form: any; field: any }) => {
          const { errors, touched } = form;
          const errorPayload: EvalNamePayload = EvalNameFunction(name!, errors, touched);
          return (
            <div>
              <Checkbox
                id={name}
                name={name}
                color="primary"
                size="medium"
                checked={field.value}
                {...otherProps}
                {...field}
                error={errorPayload.error && errorPayload.touched}
              />
            </div>
          );
        }}
      </Field>
    </div>
  );
};

export default CheckBoxComponent;
