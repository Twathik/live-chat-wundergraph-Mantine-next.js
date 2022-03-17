/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import { FC } from 'react';
import { Field } from 'formik';
import { Textarea, TextareaProps } from '@mantine/core';
import EvalNameFunction, { EvalNamePayload } from '../utils/EvalName';

const TextAreaComponent: FC<TextareaProps> = (props) => {
  const { label, name, ...otherProps } = props;
  return (
    <Field name={name}>
      {({ form, field }: { form: any; field: any }) => {
        const { errors, touched } = form;
        const errorPayload: EvalNamePayload = EvalNameFunction(name!, errors, touched);
        return (
          <Textarea
            name={name}
            label={label}
            {...otherProps}
            {...field}
            error={errorPayload.error && errorPayload.touched ? errorPayload.error : ''}
            autoComplete={name}
          />
        );
      }}
    </Field>
  );
};

export default TextAreaComponent;
