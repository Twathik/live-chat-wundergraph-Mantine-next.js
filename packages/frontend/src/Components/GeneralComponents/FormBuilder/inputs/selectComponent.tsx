/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/no-cycle */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
import { FC } from 'react';
import { Field } from 'formik';
import { Select, SelectProps } from '@mantine/core';
import EvalNameFunction, { EvalNamePayload } from '../utils/EvalName';

const SelectComponent: FC<SelectProps> = (props) => {
  const { label, name, value, type, data, ...otherProps } = props;
  return (
    <div>
      <Field name={name}>
        {({ form, field }: { form: any; field: any }) => {
          const { errors, touched } = form;
          const errorPayload: EvalNamePayload = EvalNameFunction(name!, errors, touched);
          return (
            <Select
              label={label}
              name={name}
              id={name}
              value={value}
              data={data}
              error={errorPayload.error && errorPayload.touched}
              {...field}
              {...otherProps}
            />
          );
        }}
      </Field>
    </div>
  );
};

export default SelectComponent;
