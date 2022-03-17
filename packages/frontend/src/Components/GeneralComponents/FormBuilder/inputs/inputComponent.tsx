/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import { Field } from 'formik';
import EvalNameFunction, { EvalNamePayload } from '../utils/EvalName';
import { TextInput, TextInputProps } from '@mantine/core';

const InputComponent: FC<TextInputProps> = (props) => {
  const { label, name, type, ...otherProps } = props;

  return (
    <Field name={name}>
      {({ form, field }: { form: any; field: any }) => {
        const { errors, touched } = form;
        const errorPayload: EvalNamePayload = EvalNameFunction(name!, errors, touched);

        return (
          <TextInput
            color="primary"
            name={name}
            type={type}
            label={label}
            margin="normal"
            variant="outlined"
            fullWidth
            id={name}
            helperText={errorPayload.display ? errorPayload.error : ''}
            error={errorPayload.display}
            {...otherProps}
            {...field}
          />
        );
      }}
    </Field>
  );
};
export default InputComponent;
