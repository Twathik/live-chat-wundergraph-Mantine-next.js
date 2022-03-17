/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import { Field } from 'formik';
import EvalNameFunction, { EvalNamePayload } from '../utils/EvalName';
import { DatePicker, DatePickerProps } from '@mantine/dates';

const DateComponent: FC<DatePickerProps> = (props) => {
  const { label, name, value, ...otherProps } = props;
  return (
    <Field name={name}>
      {({ form, field }: { form: any; field: any }) => {
        const { errors, touched } = form;
        const errorPayload: EvalNamePayload = EvalNameFunction(name!, errors, touched);
        return (
          <DatePicker
            value={value}
            error={errorPayload.display ? errorPayload.error : ''}
            name={name}
            label={label}
            fullWidth
            id={name}
            {...field}
            {...otherProps}
          />
        );
      }}
    </Field>
  );
};
export default DateComponent;
