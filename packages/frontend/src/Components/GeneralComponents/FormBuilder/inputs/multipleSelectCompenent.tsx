/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/no-unresolved */
import React, { FC } from 'react';
import { Field } from 'formik';
import { MultiSelect, MultiSelectProps } from '@mantine/core';
import EvalNameFunction, { EvalNamePayload } from '../utils/EvalName';

const MultipleSelectInput: FC<MultiSelectProps> = (props) => {
  const { label, name, data, value, ...otherProps } = props;

  return (
    <div>
      <Field name={name}>
        {({ form, field }: { form: any; field: any }) => {
          const { errors, touched } = form;
          const errorPayload: EvalNamePayload = EvalNameFunction(name!, errors, touched);
          return (
            <MultiSelect
              data={data}
              label={label}
              name={name}
              error={errorPayload.error && errorPayload.touched}
              id={name}
              value={value}
              {...otherProps}
              {...field}
            />
          );
        }}
      </Field>
    </div>
  );
};

export default MultipleSelectInput;
